---
id: overview
title: Frontend — Resumen
sidebar_position: 1
---

# Frontend

El frontend está construido con **React + Vite**, ubicado en la carpeta `Cliente/`.

## Tecnologías

| Tecnología | Uso |
|---|---|
| React 18 | UI |
| Vite | Bundler |
| React Router DOM | Rutas |
| Bootstrap Icons (`bi-*`) | Íconos (cargados desde CDN en `index.html`) |
| Axios | Peticiones HTTP en el panel admin |
| CSS custom properties | Theming (`var(--gold)`, `var(--text)`, etc.) |

## Rutas (`App.jsx`)

| Ruta | Componente | Protección |
|---|---|---|
| `/` | Login | — |
| `/login` | Login | — |
| `/recuperar` | RecuperarContrasena | — |
| `/dashboard` | Dashboard | `RutaProtegida` |
| `/productos` | Productos | `RutaProtegida` |
| `/categorias` | Categorias | `RutaProtegida` |
| `/usuarios` | Usuarios | `SoloSuperadmin` |
| `/pedidos` | Pedidos | `SoloSuperadmin` |
| `/descuentos` | Descuentos | `SoloSuperadmin` |
| `/mi-perfil` | MiPerfil | `RutaProtegida` |
| `/tienda` | Tienda | — |
| `/tienda/perfil` | TiendaPerfil | — |
| `/tienda/checkout` | Checkout | — (redirige a login si no hay sesión) |
| `/tienda/producto/:id` | ProductoDetalle | — |
| `/tienda/pago-resultado` | PagoResultado | — |

**`RutaProtegida`** — verifica que exista `adminSesion` en `sessionStorage`, si no redirige a `/login`.

**`SoloSuperadmin`** — además verifica que `sesion.rol === 'superadmin'`, si no redirige a `/dashboard`.

## Sesión del administrador

Se guarda en `sessionStorage` bajo la clave `adminSesion`:

```json
{
  "token": "eyJ...",
  "rol": "superadmin",
  "nombre": "luis",
  "apellido": "gomez",
  "correo": "luis.gomez@meil.com",
  "id": 11
}
```

## Sesión del cliente (tienda)

Se guarda en `sessionStorage` bajo la clave `tiendaSesion`.

## Carrito y sesión de reserva

- Carrito persistido en `localStorage` bajo la clave `mm_carrito`
- Session ID para reservas de stock en `localStorage` bajo la clave `mm_session_id`

## Dark mode

Se activa añadiendo la clase `dark-mode` al `div` raíz en `App.jsx`. Los colores cambian vía CSS variables en `styles/global.css`:

```css
:root {
  --bg: #f4f6fb;
  --card: #ffffff;
  --text: #1e293b;
  --gold: #C9962A;
}
.dark-mode {
  --bg: #0f172a;
  --card: #1e293b;
  --text: #f1f5f9;
}
```

## Reporte al informe 3 — Revisión de Todo el Frontend

<iframe width="560" height="315" src="https://www.youtube.com/embed/mygjIMMMOos" title="Revisión de Todo el Frontend" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen style={{maxWidth: '100%'}}></iframe>
