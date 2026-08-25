const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// ===== BASE DE DATOS =====
// Crear carpeta data si no existe
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new sqlite3.Database(path.join(dataDir, 'ranking-cup.db'), (err) => {
  if (err) console.error('Error en BD:', err);
  else console.log('✓ Base de datos conectada');
});

// Inicializar tablas
db.serialize(() => {
  // Tabla de competidores
  db.run(`CREATE TABLE IF NOT EXISTS competidores (
    id INTEGER PRIMARY KEY,
    nombre TEXT NOT NULL,
    apellidos TEXT,
    fecha_nacimiento DATE,
    edad INTEGER,
    peso REAL,
    altura REAL,
    sexo TEXT,
    modalidad TEXT,
    categoria TEXT,
    usuario TEXT UNIQUE,
    password TEXT,
    telefono TEXT,
    email TEXT,
    club TEXT,
    entrenador TEXT,
    coach TEXT,
    modalidades TEXT,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Añadir columnas faltantes si no existen (para compatibilidad con BD existentes)
  db.run(`PRAGMA table_info(competidores)`, (err, info) => {
    const existingColumns = info ? info.map(col => col.name) : [];
    const newColumns = [
      { name: 'apellidos', sql: 'ALTER TABLE competidores ADD COLUMN apellidos TEXT' },
      { name: 'fecha_nacimiento', sql: 'ALTER TABLE competidores ADD COLUMN fecha_nacimiento DATE' },
      { name: 'altura', sql: 'ALTER TABLE competidores ADD COLUMN altura REAL' },
      { name: 'telefono', sql: 'ALTER TABLE competidores ADD COLUMN telefono TEXT' },
      { name: 'email', sql: 'ALTER TABLE competidores ADD COLUMN email TEXT' },
      { name: 'club', sql: 'ALTER TABLE competidores ADD COLUMN club TEXT' },
      { name: 'entrenador', sql: 'ALTER TABLE competidores ADD COLUMN entrenador TEXT' },
      { name: 'coach', sql: 'ALTER TABLE competidores ADD COLUMN coach TEXT' },
      { name: 'modalidades', sql: 'ALTER TABLE competidores ADD COLUMN modalidades TEXT' }
    ];

    newColumns.forEach(col => {
      if (!existingColumns.includes(col.name)) {
        db.run(col.sql, (err) => {
          if (!err) console.log(`✓ Columna ${col.name} añadida a competidores`);
        });
      }
    });
  });

  // Tabla de categorías
  db.run(`CREATE TABLE IF NOT EXISTS categorias (
    id INTEGER PRIMARY KEY,
    nombre TEXT UNIQUE,
    edad_min INTEGER,
    edad_max INTEGER,
    peso_min REAL,
    peso_max REAL,
    sexo TEXT,
    modalidad TEXT
  )`);

  // Tabla de enfrentamientos
  db.run(`CREATE TABLE IF NOT EXISTS enfrentamientos (
    id INTEGER PRIMARY KEY,
    categoria_id INTEGER,
    competidor1_id INTEGER,
    competidor2_id INTEGER,
    ganador_id INTEGER,
    ring INTEGER,
    estado TEXT DEFAULT 'pendiente',
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(categoria_id) REFERENCES categorias(id),
    FOREIGN KEY(competidor1_id) REFERENCES competidores(id),
    FOREIGN KEY(competidor2_id) REFERENCES competidores(id),
    FOREIGN KEY(ganador_id) REFERENCES competidores(id)
  )`);

  // Tabla de resultados
  db.run(`CREATE TABLE IF NOT EXISTS resultados (
    id INTEGER PRIMARY KEY,
    enfrentamiento_id INTEGER,
    ganador_id INTEGER,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    ring INTEGER,
    FOREIGN KEY(enfrentamiento_id) REFERENCES enfrentamientos(id),
    FOREIGN KEY(ganador_id) REFERENCES competidores(id)
  )`);

  // Cargar categorías oficiales
  db.get('SELECT COUNT(*) as count FROM categorias', (err, row) => {
    if (!err && row.count === 0) {
      console.log('📥 Cargando categorías oficiales...');
      const categoriaSQL = fs.readFileSync('./categorias-oficiales.sql', 'utf8');
      db.exec(categoriaSQL, (err) => {
        if (!err) {
          console.log('✓ Categorías oficiales cargadas');
        }
      });
    }
  });

  // Cargar datos de prueba si la BD está vacía
  db.get('SELECT COUNT(*) as count FROM competidores', (err, row) => {
    if (!err && row.count === 0) {
      console.log('📥 Generando competidores de prueba...');

      // Datos genéricos para pruebas
      const nombres = ['Juan', 'María', 'Carlos', 'Ana', 'Pedro', 'Rosa', 'Miguel', 'Laura', 'Diego', 'Sofia'];
      const apellidos = ['García', 'López', 'Martínez', 'Rodríguez', 'Pérez', 'Sánchez', 'Torres', 'Ramírez', 'Quispe', 'Flores'];
      const modalidades = ['Free Boxing', 'Light Free Boxing', 'Kick Boxing Light', 'Point Fighting', 'Self-Defense', 'Artes Marciales Tradicionales', 'Kumite Femenino'];
      const clubs = ['Club 1', 'Club 2', 'Club 3', 'Club 4', 'Club 5'];
      const entrenadores = ['Entrenador A', 'Entrenador B', 'Entrenador C', 'Entrenador D'];

      const categorias_oficiales = [
        { edad: 12, peso: 35, sexo: 'Femenino' },
        { edad: 14, peso: 45, sexo: 'Femenino' },
        { edad: 16, peso: 55, sexo: 'Femenino' },
        { edad: 18, peso: 65, sexo: 'Femenino' },
        { edad: 12, peso: 40, sexo: 'Masculino' },
        { edad: 14, peso: 50, sexo: 'Masculino' },
        { edad: 16, peso: 60, sexo: 'Masculino' },
        { edad: 18, peso: 70, sexo: 'Masculino' }
      ];

      let insertados = 0;

      // Generar 120 competidores
      for (let i = 0; i < 120; i++) {
        const nombre = nombres[Math.floor(Math.random() * nombres.length)];
        const apellido = apellidos[Math.floor(Math.random() * apellidos.length)];
        const modalidad = modalidades[Math.floor(Math.random() * modalidades.length)];
        const cat = categorias_oficiales[Math.floor(Math.random() * categorias_oficiales.length)];
        const club = clubs[Math.floor(Math.random() * clubs.length)];
        const entrenador = entrenadores[Math.floor(Math.random() * entrenadores.length)];
        const fechaNac = new Date(2010 - cat.edad, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);

        const usuario = `user_${i}`;
        const password = Math.random().toString(36).substring(2, 10);
        const peso = cat.peso + Math.floor(Math.random() * 5) - 2;
        const altura = cat.sexo === 'Femenino' ? 1.55 + Math.random() * 0.15 : 1.70 + Math.random() * 0.15;
        const email = `competidor${i}@ranking-cup.local`;
        const telefono = `+34 6${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`;

        db.run(
          `INSERT INTO competidores (nombre, apellidos, fecha_nacimiento, edad, peso, altura, sexo, modalidad, categoria, usuario, password, telefono, email, club, entrenador, coach)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            nombre,
            apellido,
            fechaNac.toISOString().split('T')[0],
            cat.edad,
            peso,
            altura,
            cat.sexo,
            modalidad,
            `${cat.edad} años - ${peso}kg - ${cat.sexo} - ${modalidad}`,
            usuario,
            password,
            telefono,
            email,
            club,
            entrenador,
            'Coach ' + Math.floor(Math.random() * 5) + 1
          ],
          function() {
            insertados++;
            if (insertados === 120) {
              console.log('✓ 120 competidores generados automáticamente');
            }
          }
        );
      }
    }
  });
});

// ===== APIs - ADMIN =====

// Registrar competidor
app.post('/api/admin/competidor', (req, res) => {
  const { nombre, edad, peso, sexo, modalidad } = req.body;
  const categoria = `${edad} años - ${peso}kg - ${sexo} - ${modalidad}`;

  // Generar usuario y contraseña automáticamente
  const usuario = nombre.toLowerCase().replace(/\s+/g, '_').substring(0, 15);
  const password = Math.random().toString(36).substring(2, 10); // Contraseña aleatoria de 8 caracteres

  db.run(
    `INSERT INTO competidores (nombre, edad, peso, sexo, modalidad, categoria, usuario, password)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [nombre, edad, peso, sexo, modalidad, categoria, usuario, password],
    function(err) {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        const competidor = {
          id: this.lastID,
          nombre,
          edad,
          peso,
          sexo,
          modalidad,
          categoria,
          usuario,
          password
        };
        res.json(competidor);
        io.emit('competidor-registrado', competidor);
      }
    }
  );
});

// Obtener todos los competidores
app.get('/api/admin/competidores', (req, res) => {
  db.all('SELECT * FROM competidores ORDER BY categoria', (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.json(rows || []);
    }
  });
});

// Generar brackets (emparejar competidores por categoría oficial)
app.post('/api/admin/generar-brackets', (req, res) => {
  const configRings = req.body.configRings || {};

  // Primero, eliminar enfrentamientos previos
  db.run('DELETE FROM enfrentamientos', (err) => {
    if (err) console.error('Error limpiando brackets:', err);
  });

  // Obtener todas las categorías oficiales
  db.all('SELECT id, nombre, edad_min, edad_max, peso_min, peso_max, sexo, modalidad FROM categorias', (err, categorias) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    let enfrentamientos = [];
    let completadas = 0;

    if (!categorias || categorias.length === 0) {
      return res.json({
        mensaje: 'No hay categorías definidas',
        total: 0
      });
    }

    // Para cada categoría oficial, buscar competidores que encajen
    categorias.forEach(cat => {
      // VERIFICAR que la categoría tenga sexo definido
      if (!cat.sexo) {
        console.error(`⚠️ Categoría "${cat.nombre}" sin sexo definido`);
        completadas++;
        return;
      }

      db.all(
        `SELECT id, nombre, sexo FROM competidores
         WHERE edad >= ? AND edad <= ?
           AND peso >= ? AND peso <= ?
           AND sexo = ?
           AND modalidad = ?
         ORDER BY peso ASC`,
        [cat.edad_min, cat.edad_max, cat.peso_min, cat.peso_max, cat.sexo, cat.modalidad],
        (err, competidores) => {
          completadas++;

          // Verificar que TODOS los competidores tienen el sexo correcto
          if (competidores && competidores.length > 0) {
            const sexoIncorrecto = competidores.filter(c => c.sexo !== cat.sexo);
            if (sexoIncorrecto.length > 0) {
              console.error(`❌ ERROR: Se encontraron competidores con sexo incorrecto en categoría "${cat.nombre}"`);
              console.error(`  Esperado: ${cat.sexo}, Encontrado: ${sexoIncorrecto.map(c => c.sexo).join(', ')}`);
            }
          }

          if (!err && competidores && competidores.length >= 2) {
            // Obtener rings para esta modalidad
            const modalidad = cat.modalidad || 'Kickboxing';
            const ringsDisponibles = configRings[modalidad] || [1, 2, 3];
            let ringIndex = 0;

            // Emparejar: 1 vs 2, 3 vs 4, etc.
            for (let i = 0; i < competidores.length - 1; i += 2) {
              const ring = ringsDisponibles[ringIndex % ringsDisponibles.length];
              ringIndex++;

              db.run(
                `INSERT INTO enfrentamientos (categoria_id, competidor1_id, competidor2_id, ring, estado)
                 VALUES (?, ?, ?, ?, 'pendiente')`,
                [cat.id, competidores[i].id, competidores[i + 1].id, ring],
                function() {
                  enfrentamientos.push({
                    id: this.lastID,
                    categoria: cat.nombre,
                    competidor1: competidores[i].nombre,
                    competidor2: competidores[i + 1].nombre,
                    ring: ring,
                    estado: 'pendiente'
                  });
                }
              );
            }
          }

          // Cuando se hayan procesado todas las categorías, responder
          if (completadas === categorias.length) {
            setTimeout(() => {
              res.json({
                mensaje: 'Brackets generados correctamente',
                total: enfrentamientos.length,
                detalles: enfrentamientos.slice(0, 5)
              });
              io.emit('brackets-generados', enfrentamientos);
            }, 1000);
          }
        }
      );
    });
  });
});

// ===== APIs - ÁRBITROS =====

// Registrar ganador
app.post('/api/arbitro/registrar-ganador', (req, res) => {
  const { enfrentamiento_id, ganador_id, ring } = req.body;

  db.run(
    `UPDATE enfrentamientos SET ganador_id = ?, estado = 'finalizado' WHERE id = ?`,
    [ganador_id, enfrentamiento_id],
    function(err) {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        db.run(
          `INSERT INTO resultados (enfrentamiento_id, ganador_id, ring) VALUES (?, ?, ?)`,
          [enfrentamiento_id, ganador_id, ring],
          function() {
            res.json({
              mensaje: 'Ganador registrado',
              id: this.lastID
            });
            io.emit('resultado-registrado', {
              enfrentamiento_id,
              ganador_id,
              ring
            });
          }
        );
      }
    }
  );
});

// Obtener lista de rings (siempre los 4)
app.get('/api/arbitro/rings', (req, res) => {
  // Devolver siempre los 4 rings disponibles
  res.json({
    rings: [1, 2, 3, 4],
    ringNames: {
      1: 'Ring 1',
      2: 'Ring 2',
      3: 'Tatami 1',
      4: 'Tatami 2'
    }
  });
});

// Obtener enfrentamiento actual y próximo (versión mejorada)
app.get('/api/arbitro/ring/:ring', (req, res) => {
  const ring = req.params.ring;

  db.all(
    `SELECT e.id, e.competidor1_id, e.competidor2_id, e.categoria_id, e.estado,
            c1.nombre as competidor1, c1.peso as peso1, c1.categoria as categoria1,
            c2.nombre as competidor2, c2.peso as peso2, c2.categoria as categoria2,
            cat.modalidad
     FROM enfrentamientos e
     JOIN competidores c1 ON e.competidor1_id = c1.id
     JOIN competidores c2 ON e.competidor2_id = c2.id
     JOIN categorias cat ON e.categoria_id = cat.id
     WHERE e.ring = ?
     ORDER BY e.estado = 'finalizado', e.id ASC
     LIMIT 2`,
    [ring],
    (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        let currentMatch = null;
        let nextMatch = null;

        if (rows && rows.length > 0) {
          currentMatch = rows[0];
          if (rows.length > 1) {
            nextMatch = rows[1];
          }
        }

        res.json({ currentMatch, nextMatch });
      }
    }
  );
});

// Deshacer último resultado
app.post('/api/arbitro/deshacer', (req, res) => {
  const { ring } = req.body;

  db.get(
    `SELECT r.id, r.enfrentamiento_id FROM resultados r
     JOIN enfrentamientos e ON r.enfrentamiento_id = e.id
     WHERE e.ring = ? ORDER BY r.id DESC LIMIT 1`,
    [ring],
    (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else if (!row) {
        res.json({ success: false, error: 'No hay resultados para deshacer' });
      } else {
        // Restaurar enfrentamiento a estado pendiente
        db.run(
          `UPDATE enfrentamientos SET ganador_id = NULL, estado = 'pendiente' WHERE id = ?`,
          [row.enfrentamiento_id],
          function(err) {
            if (err) {
              res.status(400).json({ error: err.message });
            } else {
              // Eliminar registro de resultado
              db.run(
                `DELETE FROM resultados WHERE id = ?`,
                [row.id],
                function(err) {
                  if (err) {
                    res.status(400).json({ error: err.message });
                  } else {
                    res.json({ success: true });
                    io.emit('resultado-deshecho', { ring });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

// ===== APIs - PANTALLA LIVE =====

// Obtener ranking actualizado
app.get('/api/live/ranking', (req, res) => {
  db.all(
    `SELECT c.*, COUNT(r.id) as victorias
     FROM competidores c
     LEFT JOIN resultados r ON r.ganador_id = c.id
     GROUP BY c.id
     ORDER BY victorias DESC, c.nombre ASC`,
    (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        res.json(rows || []);
      }
    }
  );
});

// Obtener próximos enfrentamientos
app.get('/api/live/proximos', (req, res) => {
  db.all(
    `SELECT e.*, c1.nombre as competidor1_nombre, c2.nombre as competidor2_nombre, cat.modalidad
     FROM enfrentamientos e
     JOIN competidores c1 ON e.competidor1_id = c1.id
     JOIN competidores c2 ON e.competidor2_id = c2.id
     JOIN categorias cat ON e.categoria_id = cat.id
     WHERE e.estado = 'pendiente'
     ORDER BY cat.modalidad, e.ring, e.id
     LIMIT 10`,
    (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        res.json(rows || []);
      }
    }
  );
});

// Obtener últimos resultados
app.get('/api/live/ultimos-resultados', (req, res) => {
  db.all(
    `SELECT r.*, c.nombre as ganador_nombre, e.ring
     FROM resultados r
     JOIN competidores c ON r.ganador_id = c.id
     JOIN enfrentamientos e ON r.enfrentamiento_id = e.id
     ORDER BY r.fecha DESC
     LIMIT 5`,
    (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        res.json(rows || []);
      }
    }
  );
});

// ===== APIs - COMPETIDORES =====

// Login competidor
app.post('/api/competidor/login', (req, res) => {
  const { usuario, password } = req.body;

  db.get(
    `SELECT id, nombre, edad, peso, sexo, modalidad, categoria FROM competidores WHERE usuario = ? AND password = ?`,
    [usuario, password],
    (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else if (row) {
        res.json({ success: true, competidor: { ...row, usuario } });
      } else {
        res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
      }
    }
  );
});

// Obtener combates próximos del competidor
app.get('/api/competidor/:id/combates', (req, res) => {
  const competidorId = req.params.id;

  db.all(
    `SELECT e.*, c1.nombre as competidor1_nombre, c2.nombre as competidor2_nombre, cat.modalidad, e.estado
     FROM enfrentamientos e
     JOIN competidores c1 ON e.competidor1_id = c1.id
     JOIN competidores c2 ON e.competidor2_id = c2.id
     JOIN categorias cat ON e.categoria_id = cat.id
     WHERE (e.competidor1_id = ? OR e.competidor2_id = ?) AND e.estado != 'finalizado'
     ORDER BY e.id ASC`,
    [competidorId, competidorId],
    (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        res.json(rows || []);
      }
    }
  );
});

// Obtener competidores que vienen después (misma categoría, esperando)
app.get('/api/competidor/:id/proximos', (req, res) => {
  const competidorId = req.params.id;

  // Primero obtengo la categoría del competidor
  db.get(
    `SELECT categoria_id FROM enfrentamientos
     WHERE (competidor1_id = ? OR competidor2_id = ?) LIMIT 1`,
    [competidorId, competidorId],
    (err, catRow) => {
      if (err || !catRow) {
        res.json([]);
        return;
      }

      // Luego obtengo los próximos en su categoría
      db.all(
        `SELECT e.*, c1.nombre as competidor1_nombre, c2.nombre as competidor2_nombre, cat.modalidad
         FROM enfrentamientos e
         JOIN competidores c1 ON e.competidor1_id = c1.id
         JOIN competidores c2 ON e.competidor2_id = c2.id
         JOIN categorias cat ON e.categoria_id = cat.id
         WHERE e.categoria_id = ? AND e.estado = 'pendiente'
         ORDER BY e.id ASC
         LIMIT 5`,
        [catRow.categoria_id],
        (err, rows) => {
          if (err) {
            res.status(400).json({ error: err.message });
          } else {
            res.json(rows || []);
          }
        }
      );
    }
  );
});

// Obtener campeones por modalidad, peso, edad y sexo
app.get('/api/live/campeones', (req, res) => {
  db.all(
    `SELECT
      c.modalidad,
      c.edad,
      c.peso,
      c.sexo,
      c.nombre,
      COUNT(r.id) as victorias
     FROM competidores c
     LEFT JOIN resultados r ON r.ganador_id = c.id
     GROUP BY c.modalidad, CAST(c.peso AS INTEGER), c.sexo,
              CASE
                WHEN c.edad < 13 THEN 'Niños (0-12)'
                WHEN c.edad < 16 THEN 'Cadetes (13-15)'
                WHEN c.edad < 18 THEN 'Junior (16-17)'
                ELSE 'Adultos (18+)'
              END
     ORDER BY c.modalidad,
              CASE
                WHEN c.edad < 13 THEN 0
                WHEN c.edad < 16 THEN 1
                WHEN c.edad < 18 THEN 2
                ELSE 3
              END,
              c.sexo,
              c.peso,
              victorias DESC`,
    (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        // Procesar resultados para obtener solo el campeón por grupo
        const campeones = {};
        const resultado = [];

        if (rows) {
          rows.forEach(row => {
            const key = `${row.modalidad}|${row.peso}|${row.sexo}|${row.edad}`;
            if (!campeones[key]) {
              campeones[key] = row;
              resultado.push({
                modalidad: row.modalidad,
                peso: row.peso,
                sexo: row.sexo,
                edad: row.edad,
                categoriaEdad: row.edad < 13 ? 'Niños' : row.edad < 16 ? 'Cadetes' : row.edad < 18 ? 'Junior' : 'Adultos',
                nombre: row.nombre,
                victorias: row.victorias
              });
            }
          });
        }

        res.json(resultado);
      }
    }
  );
});

// ===== APIs - REGISTRO =====

// Registrar nuevo competidor desde página de registro
app.post('/api/registro/competidor', (req, res) => {
  const {
    nombre,
    apellidos,
    fechaNacimiento,
    sexo,
    peso,
    altura,
    telefono,
    email,
    club,
    entrenador,
    coach,
    categoria,
    modalidades
  } = req.body;

  // Calcular edad a partir de fecha de nacimiento
  const birthDate = new Date(fechaNacimiento);
  const today = new Date();
  let edad = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    edad--;
  }

  // Generar usuario automáticamente
  const usuario = (nombre + apellidos).toLowerCase().replace(/\s+/g, '_').substring(0, 15);
  const password = Math.random().toString(36).substring(2, 10);

  // Guardar modalidades como JSON string
  const modalidadesStr = JSON.stringify(Array.isArray(modalidades) ? modalidades : []);

  db.run(
    `INSERT INTO competidores (nombre, apellidos, fecha_nacimiento, sexo, peso, altura, telefono, email, club, entrenador, coach, categoria, modalidades, edad, usuario, password)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [nombre, apellidos, fechaNacimiento, sexo, peso, altura, telefono, email, club, entrenador, coach, categoria, modalidadesStr, edad, usuario, password],
    function(err) {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        const nuevoCompetidor = {
          id: this.lastID,
          nombre,
          apellidos,
          fechaNacimiento,
          edad,
          sexo,
          peso,
          altura,
          telefono,
          email,
          club,
          entrenador,
          coach,
          categoria,
          modalidades: Array.isArray(modalidades) ? modalidades : [],
          usuario,
          password
        };
        res.json({ success: true, competidor: nuevoCompetidor });
        io.emit('competidor-registrado', nuevoCompetidor);
      }
    }
  );
});

// ===== APIs - CAMPEONES =====

// Obtener últimos 5 ganadores por ring
app.get('/api/campeones/por-ring', (req, res) => {
  db.all(
    `SELECT DISTINCT ring FROM resultados ORDER BY ring`,
    (err, rings) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }

      const ringArray = rings ? rings.map(r => r.ring) : [1, 2, 3, 4];
      const resultado = {};

      if (ringArray.length === 0) {
        return res.json(resultado);
      }

      let completadas = 0;

      ringArray.forEach(ringNum => {
        db.all(
          `SELECT r.id, r.ganador_id, r.fecha, c.nombre, c.categoria, c.peso
           FROM resultados r
           JOIN competidores c ON r.ganador_id = c.id
           WHERE r.ring = ?
           ORDER BY r.fecha DESC
           LIMIT 5`,
          [ringNum],
          (err, rows) => {
            if (!err) {
              resultado[`ring${ringNum}`] = rows || [];
            }
            completadas++;

            // Cuando se hayan procesado todos los rings, responder
            if (completadas === ringArray.length) {
              res.json(resultado);
            }
          }
        );
      });
    }
  );
});

// ===== WEBSOCKETS =====
io.on('connection', (socket) => {
  console.log('✓ Cliente conectado:', socket.id);

  socket.on('disconnect', () => {
    console.log('✗ Cliente desconectado:', socket.id);
  });
});

// ===== SERVIDOR =====
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════╗
║      RANKING CUP - WKF Golden Cup ║
║     Sistema en ejecución 🚀       ║
╚════════════════════════════════════╝

📍 Admin:      http://localhost:${PORT}/admin.html
📍 Árbitro:    http://localhost:${PORT}/arbitro.html
📍 Live:       http://localhost:${PORT}/live.html

  `);
});
