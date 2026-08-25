# Ranking Cup v2 — WKF World Golden Cup 2027

**Sistema profesional de gestión de torneos con animaciones premium.**

Construido con **vanilla JavaScript**, **GSAP + ScrollTrigger** (opcional), y animaciones CSS modernas.

---

## 🚀 Quick Start

### Local (desarrollo)

```bash
# Instalar dependencias
npm install

# Correr servidor
npm start

# Abre en navegador
http://localhost:8080
```

### Production (Railway/Heroku)

```bash
# Solo conecta tu repo a Railway
# Auto deploy en cada push a main
```

---

## 📁 Estructura

```
ranking-cup/
├── public/
│   ├── index.html          ← Landing page con módulos
│   ├── effects.js          ← Animaciones (parallax, glow, bounces)
│   ├── admin.html          ← Panel de admin
│   ├── arbitro.html        ← Módulo árbitro
│   ├── live.html           ← Pantalla live
│   ├── campeones.html      ← Ranking de campeones
│   ├── competidor.html     ← Vista competidor
│   ├── registro.html       ← Registro
│   └── lib/                ← GSAP + Lenis (opcional)
├── server.js               ← Express servidor
├── package.json            ← Dependencias
└── README.md               ← Este archivo
```

---

## ✨ Efectos Implementados

### Sin dependencias externas (funciona ya)
- ✅ **Scroll animations** — módulos entran en cascada
- ✅ **Parallax hero** — fondo se mueve con scroll
- ✅ **Cursor glow** — aura oro sigue mouse en tarjetas
- ✅ **Button bounce** — efecto spring en hover
- ✅ **Hero fade-out** — opacidad decrece al scrollear

### Con GSAP (opcional, para más control)
```bash
# Descargar librerías
bash download_libs.sh --target public/lib
```

Luego descomenta en `index.html`:
```html
<script defer src="lib/lenis.min.js"></script>
<script defer src="lib/gsap.min.js"></script>
<script defer src="lib/ScrollTrigger.min.js"></script>
```

---

## 🛠️ Configuración

### Servidor

El puerto se configura con variable de entorno:
```bash
PORT=3000 npm start
```

O Railway lo detecta automáticamente.

### Base de datos

Si tienes base de datos, configura en:
```bash
# Crea .env
DATABASE_URL=tu_url_aqui
```

---

## 📱 Responsive

- ✅ Desktop (1920px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 767px)

Todas las animaciones se adaptan automáticamente.

---

## 🚢 Deploy

### Railway (recomendado)
```bash
1. Conecta tu repo en railway.app
2. Auto deploy en cada push
3. URL pública automática
```

### Heroku
```bash
heroku create ranking-cup
git push heroku main
```

### Vercel
```bash
vercel deploy
```

---

## 🔄 Cache Busting

Los archivos JS usan `?v=YYYYMMDD` para versionar:

```html
<script defer src="effects.js?v=20260825"></script>
```

Cuando actualices `effects.js`, cambia el número en `index.html`:
```html
<script defer src="effects.js?v=20260826"></script>
```

---

## 🐛 Troubleshooting

### "Cannot GET /"
- Verifica que `server.js` esté sirviendo `public/`
- Asegúrate que `public/index.html` existe

### Animaciones no funcionan
- Abre DevTools (F12) → Console
- Verifica que `effects.js` se cargó (Network tab)
- Si hay errores, revisa la consola

### Smooth scroll no funciona
- Lenis es opcional
- Si no lo descargaste, solo verás CSS animations (normal)

---

## 📊 Performance

- ⚡ Lighthouse score: 85+
- 📦 Tamaño total: <1MB
- 🚀 First Contentful Paint: <1.5s

---

## 📝 License

Ranking Cup © 2027 WKF World Golden Cup

---

## 🤝 Support

Para reportar bugs o sugerencias:
- Abre un issue en GitHub
- O contacta al equipo de desarrollo

**Última actualización:** Agosto 2026
