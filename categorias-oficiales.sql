-- CATEGORÍAS OFICIALES PARA TORNEO WKF
-- Basadas en estándares internacionales de boxeo y kickboxing

-- ADULTOS MASCULINOS (18+ años)
INSERT OR IGNORE INTO categorias (nombre, edad_min, edad_max, peso_min, peso_max, sexo, modalidad) VALUES
('Adulto Masculino - Gallo', 18, 100, 52.0, 54.0, 'Masculino', 'Kickboxing'),
('Adulto Masculino - Pluma', 18, 100, 54.0, 57.0, 'Masculino', 'Kickboxing'),
('Adulto Masculino - Ligero', 18, 100, 57.0, 60.0, 'Masculino', 'Kickboxing'),
('Adulto Masculino - Ligero Welter', 18, 100, 60.0, 63.5, 'Masculino', 'Kickboxing'),
('Adulto Masculino - Welter', 18, 100, 63.5, 67.0, 'Masculino', 'Kickboxing'),
('Adulto Masculino - Superwelter', 18, 100, 67.0, 71.0, 'Masculino', 'Kickboxing'),
('Adulto Masculino - Medio', 18, 100, 71.0, 75.0, 'Masculino', 'Kickboxing'),
('Adulto Masculino - Semipesado', 18, 100, 75.0, 81.0, 'Masculino', 'Kickboxing'),
('Adulto Masculino - Medio Pesado', 18, 100, 81.0, 91.0, 'Masculino', 'Kickboxing'),
('Adulto Masculino - Pesado', 18, 100, 91.0, 9999.0, 'Masculino', 'Kickboxing');

-- ADULTOS FEMENINOS (18+ años)
INSERT OR IGNORE INTO categorias (nombre, edad_min, edad_max, peso_min, peso_max, sexo, modalidad) VALUES
('Adulto Femenino - Gallo', 18, 100, 50.0, 52.0, 'Femenino', 'Kickboxing'),
('Adulto Femenino - Pluma', 18, 100, 52.0, 55.0, 'Femenino', 'Kickboxing'),
('Adulto Femenino - Ligero', 18, 100, 55.0, 58.0, 'Femenino', 'Kickboxing'),
('Adulto Femenino - Ligero Welter', 18, 100, 58.0, 61.0, 'Femenino', 'Kickboxing'),
('Adulto Femenino - Welter', 18, 100, 61.0, 65.0, 'Femenino', 'Kickboxing'),
('Adulto Femenino - Superwelter', 18, 100, 65.0, 69.0, 'Femenino', 'Kickboxing'),
('Adulto Femenino - Medio', 18, 100, 69.0, 73.0, 'Femenino', 'Kickboxing'),
('Adulto Femenino - Semipesado', 18, 100, 73.0, 79.0, 'Femenino', 'Kickboxing'),
('Adulto Femenino - Medio Pesado', 18, 100, 79.0, 88.0, 'Femenino', 'Kickboxing'),
('Adulto Femenino - Pesado', 18, 100, 88.0, 9999.0, 'Femenino', 'Kickboxing');

-- JUNIOR MASCULINO (16-18 años)
INSERT OR IGNORE INTO categorias (nombre, edad_min, edad_max, peso_min, peso_max, sexo, modalidad) VALUES
('Junior Masculino - Gallo', 16, 17, 50.0, 52.0, 'Masculino', 'Kickboxing'),
('Junior Masculino - Pluma', 16, 17, 52.0, 55.0, 'Masculino', 'Kickboxing'),
('Junior Masculino - Ligero', 16, 17, 55.0, 58.0, 'Masculino', 'Kickboxing'),
('Junior Masculino - Ligero Welter', 16, 17, 58.0, 61.0, 'Masculino', 'Kickboxing'),
('Junior Masculino - Welter', 16, 17, 61.0, 65.0, 'Masculino', 'Kickboxing'),
('Junior Masculino - Superwelter', 16, 17, 65.0, 69.0, 'Masculino', 'Kickboxing'),
('Junior Masculino - Medio', 16, 17, 69.0, 73.0, 'Masculino', 'Kickboxing'),
('Junior Masculino - Semipesado', 16, 17, 73.0, 79.0, 'Masculino', 'Kickboxing'),
('Junior Masculino - Medio Pesado', 16, 17, 79.0, 88.0, 'Masculino', 'Kickboxing'),
('Junior Masculino - Pesado', 16, 17, 88.0, 9999.0, 'Masculino', 'Kickboxing');

-- JUNIOR FEMENINO (16-18 años)
INSERT OR IGNORE INTO categorias (nombre, edad_min, edad_max, peso_min, peso_max, sexo, modalidad) VALUES
('Junior Femenino - Gallo', 16, 17, 48.0, 50.0, 'Femenino', 'Kickboxing'),
('Junior Femenino - Pluma', 16, 17, 50.0, 53.0, 'Femenino', 'Kickboxing'),
('Junior Femenino - Ligero', 16, 17, 53.0, 56.0, 'Femenino', 'Kickboxing'),
('Junior Femenino - Ligero Welter', 16, 17, 56.0, 59.0, 'Femenino', 'Kickboxing'),
('Junior Femenino - Welter', 16, 17, 59.0, 63.0, 'Femenino', 'Kickboxing'),
('Junior Femenino - Superwelter', 16, 17, 63.0, 67.0, 'Femenino', 'Kickboxing'),
('Junior Femenino - Medio', 16, 17, 67.0, 71.0, 'Femenino', 'Kickboxing'),
('Junior Femenino - Semipesado', 16, 17, 71.0, 77.0, 'Femenino', 'Kickboxing'),
('Junior Femenino - Medio Pesado', 16, 17, 77.0, 86.0, 'Femenino', 'Kickboxing'),
('Junior Femenino - Pesado', 16, 17, 86.0, 9999.0, 'Femenino', 'Kickboxing');

-- CADETE MASCULINO (13-16 años)
INSERT OR IGNORE INTO categorias (nombre, edad_min, edad_max, peso_min, peso_max, sexo, modalidad) VALUES
('Cadete Masculino - Gallo', 13, 15, 45.0, 48.0, 'Masculino', 'Kickboxing'),
('Cadete Masculino - Pluma', 13, 15, 48.0, 51.0, 'Masculino', 'Kickboxing'),
('Cadete Masculino - Ligero', 13, 15, 51.0, 54.0, 'Masculino', 'Kickboxing'),
('Cadete Masculino - Ligero Welter', 13, 15, 54.0, 57.0, 'Masculino', 'Kickboxing'),
('Cadete Masculino - Welter', 13, 15, 57.0, 61.0, 'Masculino', 'Kickboxing'),
('Cadete Masculino - Superwelter', 13, 15, 61.0, 65.0, 'Masculino', 'Kickboxing'),
('Cadete Masculino - Medio', 13, 15, 65.0, 69.0, 'Masculino', 'Kickboxing'),
('Cadete Masculino - Semipesado', 13, 15, 69.0, 75.0, 'Masculino', 'Kickboxing'),
('Cadete Masculino - Medio Pesado', 13, 15, 75.0, 84.0, 'Masculino', 'Kickboxing'),
('Cadete Masculino - Pesado', 13, 15, 84.0, 9999.0, 'Masculino', 'Kickboxing');

-- CADETE FEMENINO (13-16 años)
INSERT OR IGNORE INTO categorias (nombre, edad_min, edad_max, peso_min, peso_max, sexo, modalidad) VALUES
('Cadete Femenino - Gallo', 13, 15, 43.0, 46.0, 'Femenino', 'Kickboxing'),
('Cadete Femenino - Pluma', 13, 15, 46.0, 49.0, 'Femenino', 'Kickboxing'),
('Cadete Femenino - Ligero', 13, 15, 49.0, 52.0, 'Femenino', 'Kickboxing'),
('Cadete Femenino - Ligero Welter', 13, 15, 52.0, 55.0, 'Femenino', 'Kickboxing'),
('Cadete Femenino - Welter', 13, 15, 55.0, 59.0, 'Femenino', 'Kickboxing'),
('Cadete Femenino - Superwelter', 13, 15, 59.0, 63.0, 'Femenino', 'Kickboxing'),
('Cadete Femenino - Medio', 13, 15, 63.0, 67.0, 'Femenino', 'Kickboxing'),
('Cadete Femenino - Semipesado', 13, 15, 67.0, 73.0, 'Femenino', 'Kickboxing'),
('Cadete Femenino - Medio Pesado', 13, 15, 73.0, 81.0, 'Femenino', 'Kickboxing'),
('Cadete Femenino - Pesado', 13, 15, 81.0, 9999.0, 'Femenino', 'Kickboxing');

-- NIÑOS MASCULINO (hasta 13 años)
INSERT OR IGNORE INTO categorias (nombre, edad_min, edad_max, peso_min, peso_max, sexo, modalidad) VALUES
('Niño Masculino - Gallo', 0, 12, 30.0, 35.0, 'Masculino', 'Kickboxing'),
('Niño Masculino - Pluma', 0, 12, 35.0, 40.0, 'Masculino', 'Kickboxing'),
('Niño Masculino - Ligero', 0, 12, 40.0, 45.0, 'Masculino', 'Kickboxing'),
('Niño Masculino - Ligero Welter', 0, 12, 45.0, 50.0, 'Masculino', 'Kickboxing'),
('Niño Masculino - Welter', 0, 12, 50.0, 9999.0, 'Masculino', 'Kickboxing');

-- NIÑOS FEMENINO (hasta 13 años)
INSERT OR IGNORE INTO categorias (nombre, edad_min, edad_max, peso_min, peso_max, sexo, modalidad) VALUES
('Niño Femenino - Gallo', 0, 12, 28.0, 33.0, 'Femenino', 'Kickboxing'),
('Niño Femenino - Pluma', 0, 12, 33.0, 38.0, 'Femenino', 'Kickboxing'),
('Niño Femenino - Ligero', 0, 12, 38.0, 43.0, 'Femenino', 'Kickboxing'),
('Niño Femenino - Ligero Welter', 0, 12, 43.0, 48.0, 'Femenino', 'Kickboxing'),
('Niño Femenino - Welter', 0, 12, 48.0, 9999.0, 'Femenino', 'Kickboxing');
