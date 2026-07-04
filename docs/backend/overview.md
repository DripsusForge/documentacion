---
id: overview
title: Backend — Resumen
sidebar_position: 1
---

# Backend

API REST con **Node.js + Express** conectada a **PostgreSQL** vía `pg.Pool`.

## URL base

```
http://localhost:3000/api
```

## Rutas registradas en `app.js`

| Prefijo | Archivo de rutas |
|---|---|
| `/api/auth` | `routes/Auth/authRoutes.js` |
| `/api/recovery` | `routes/Auth/recoveryRoutes.js` |
| `/api/usuarios` | `routes/Usuarios/usuarios.routes.js` |
| `/api/categorias` | `routes/categorias/categorias.routes.js` |
| `/api/productos` | `routes/Productos/productos.routes.js` |
| `/api/colores` | `routes/Productos/colores.routes.js` |
| `/api/tallas` | `routes/Productos/tallas.routes.js` |
| `/api/imagenes` | `routes/Productos/imagenes.routes.js` |
| `/api/descuentos` | `routes/Descuentos/descuentos.routes.js` |
| `/api/pedidos` | `routes/Pedidos/pedidos.routes.js` |
| `/api/reservas` | `routes/Reservas/reservasRoutes.js` |
| `/api/pagos` | `routes/Pagos/pagos.routes.js` |

## Archivos estáticos

Las imágenes subidas se sirven en:
```
http://localhost:3000/uploads/productos/<nombre_archivo>
```

## CORS

Orígenes permitidos:
- `http://localhost:5173`
- `http://localhost:5174`
- `http://localhost:5180`
- `https://modamagica-frontend.onrender.com`

## Conexión a la base de datos (`config/db.js`)

```js
const pool = new Pool({
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
```

## Subida de imágenes (`config/upload.js`)

- Almacenamiento: `memoryStorage` (Render no tiene disco persistente)
- Formatos permitidos: `jpg`, `jpeg`, `png`, `webp`
- Nombre generado: `producto_<timestamp>.<ext>`

## Integración Mercado Pago (`config/mercadopago.js`)

```js
const mp = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
```

## Limpieza automática de reservas

En `app.js` hay un `setInterval` que cada **60 segundos** ejecuta:
```sql
DELETE FROM reserva_stock WHERE expira_en < now()
```
Esto libera reservas de stock vencidas sin depender de un cron externo.

## Revisión de Todo el Backend

<iframe width="560" height="315" src="https://www.youtube.com/embed/jFWqFn7ICbU" title="Revisión de Todo el Backend" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen style={{maxWidth: '100%'}}></iframe>
