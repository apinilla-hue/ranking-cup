# 🏆 RANKING CUP
## Sistema de Gestión de Torneos de Artes Marciales

Sistema profesional para gestionar torneos de kickboxing, boxeo y artes marciales en tiempo real. Diseñado para el **WKF World Golden Cup 2027**.

---

## 📋 Características

✅ **Panel Admin**
- Registrar competidores (nombre, edad, peso, sexo, modalidad)
- Clasificación automática por categoría
- Generación automática de brackets
- Estadísticas en vivo

✅ **Panel Árbitros** (Múltiples Rings)
- Interfaz optimizada para tablets
- Registro de ganadores en tiempo real
- Sincronización instantánea
- Soporte para 5+ rings simultáneos

✅ **Pantalla Live** (TV/Proyector)
- Ranking actualizado automáticamente
- Próximos enfrentamientos
- Últimos resultados
- Diseño impactante estilo WKF

✅ **Sincronización en Tiempo Real**
- WebSockets para actualizaciones instantáneas
- Sin necesidad de recargar
- Múltiples árbitros simultáneos

---

## 🚀 Instalación

### Requisitos
- **Node.js** 14+ (descargar desde https://nodejs.org)
- **npm** (viene con Node.js)

### Pasos

1. **Clonar o descargar el proyecto**
   ```bash
   cd ranking-cup
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar el servidor**
   ```bash
   npm start
   ```

   Deberías ver:
   ```
   ╔════════════════════════════════════╗
   ║      RANKING CUP - WKF Golden Cup ║
   ║     Sistema en ejecución 🚀       ║
   ╚════════════════════════════════════╝

   📍 Admin:      http://localhost:3000/admin.html
   📍 Árbitro:    http://localhost:3000/arbitro.html
   📍 Live:       http://localhost:3000/live.html
   ```

4. **Abrir en el navegador**
   - Admin: http://localhost:3000/admin.html
   - Árbitro: http://localhost:3000/arbitro.html
   - Live: http://localhost:3000/live.html

---

## 📱 Uso

### 1️⃣ Panel Admin
1. Registra todos los competidores
   - Nombre, edad, peso, sexo, modalidad
2. Haz clic en "Generar Brackets"
3. El sistema crea automáticamente los enfrentamientos

### 2️⃣ Panel Árbitros (En cada Ring)
1. Selecciona tu Ring (1-5)
2. Verás el próximo enfrentamiento
3. Haz clic en el botón del ganador
4. El resultado se sincroniza al instante

### 3️⃣ Pantalla Live (TV/Proyector)
- Muestra el ranking actualizado
- Próximos enfrentamientos por ring
- Últimos resultados
- Se actualiza automáticamente

---

## 🌐 Para Tu Servidor Futuro

Cuando compres un servidor VPS (recomendado: DigitalOcean, Linode, Hetzner):

### En el servidor:
```bash
# 1. Conectarse por SSH
ssh root@tu_servidor_ip

# 2. Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Clonar el proyecto
git clone <tu_repo> ranking-cup
cd ranking-cup

# 4. Instalar dependencias
npm install

# 5. Ejecutar (con pm2 para que nunca se caiga)
npm install -g pm2
pm2 start server.js --name "ranking-cup"
pm2 save
```

### Acceso desde cualquier lugar:
```
https://tu_dominio.com/admin.html
https://tu_dominio.com/arbitro.html
https://tu_dominio.com/live.html
```

---

## 📊 Estructura del Proyecto

```
ranking-cup/
├── server.js              # Backend (Express + Socket.io)
├── package.json           # Dependencias
├── data/
│   └── ranking-cup.db     # Base de datos SQLite
├── public/
│   ├── admin.html         # Panel Admin
│   ├── arbitro.html       # Panel Árbitros
│   └── live.html          # Pantalla Live
└── README.md              # Este archivo
```

---

## 🔧 Comandos Útiles

```bash
# Iniciar el servidor
npm start

# Ver logs en tiempo real
npm start

# Detener el servidor
Ctrl + C

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

---

## 🎨 Personalización

### Cambiar puerto (si 3000 está ocupado)
Edita `server.js` línea final:
```javascript
const PORT = process.env.PORT || 3001;  // Cambia aquí
```

### Agregar más rings
Edita `arbitro.html` y añade más botones:
```html
<button class="ring-btn" onclick="seleccionarRing(6)">Ring 6</button>
```

### Cambiar modalidades
Edita `admin.html` y añade en el `<select id="modalidad">`:
```html
<option value="Tu Modalidad">Tu Modalidad</option>
```

---

## 📱 Dispositivos Soportados

| Dispositivo | Recomendado Para | Resolución |
|-------------|-----------------|-----------|
| PC/Laptop | Admin + Control | 1920x1080+ |
| Tablet (iPad/Android) | Árbitros | 10"+ |
| Smartphone | Admin ligero | 5"+ |
| TV/Proyector | Pantalla Live | Cualquiera |

---

## ⚡ Troubleshooting

**❌ "Error: Cannot find module 'express'"**
```bash
npm install
```

**❌ "Port 3000 is already in use"**
```bash
# Cambiar puerto en server.js o usar:
PORT=3001 npm start
```

**❌ "Base de datos no funciona"**
```bash
rm -rf data/ranking-cup.db
npm start  # Crea una nueva base de datos
```

---

## 📞 Soporte

Para problemas o mejoras, contacta al desarrollador.

---

## 📜 Licencia

MIT - Libre para usar y modificar

---

**¡A ganar! 🏆**
