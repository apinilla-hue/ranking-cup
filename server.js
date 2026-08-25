#!/usr/bin/env node

const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rutas de fallback para SPA
app.get(/\.(html)$/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', req.path));
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════╗
║      RANKING CUP - WKF Golden Cup ║
║     Sistema en ejecución 🚀       ║
╚════════════════════════════════════╝
📍 URL:        http://localhost:${PORT}
📍 Admin:      http://localhost:${PORT}/admin.html
📍 Árbitro:    http://localhost:${PORT}/arbitro.html
📍 Live:       http://localhost:${PORT}/live.html
✓ Servidor activo y sirviendo archivos estáticos
  `);
});
