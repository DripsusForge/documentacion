---
id: estructura
title: Estructura del proyecto
sidebar_position: 3
---

# Estructura del proyecto

```
ModaMagica/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js               # Conexión PostgreSQL con pg.Pool
│   │   │   ├── upload.js           # Configuración Multer (memoryStorage)
│   │   │   └── mercadopago.js      # Instancia MercadoPagoConfig
│   │   ├── controllers/
│   │   │   ├── Auth/
│   │   │   │   ├── authController.js
│   │   │   │   └── recoveryController.js
│   │   │   ├── Categorias/
│   │   │   │   └── categorias.controller.js
│   │   │   ├── Descuentos/
│   │   │   │   └── descuentos.controller.js
│   │   │   ├── Pagos/
│   │   │   │   └── pagos.controller.js       # Mercado Pago + email
│   │   │   ├── Pedidos/
│   │   │   │   └── pedidos.controller.js
│   │   │   ├── Productos/
│   │   │   │   ├── colores.controller.js
│   │   │   │   ├── imagenes.controller.js
│   │   │   │   ├── productos.controller.js
│   │   │   │   └── tallas.controller.js
│   │   │   ├── Reservas/
│   │   │   │   └── reservas.controller.js    # Reserva temporal de stock
│   │   │   └── Usuarios/
│   │   │       └── usuarios.controllers.js
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   ├── routes/
│   │   │   ├── Auth/
│   │   │   │   ├── authRoutes.js
│   │   │   │   └── recoveryRoutes.js
│   │   │   ├── categorias/
│   │   │   │   └── categorias.routes.js
│   │   │   ├── Descuentos/
│   │   │   │   └── descuentos.routes.js
│   │   │   ├── Pagos/
│   │   │   │   └── pagos.routes.js
│   │   │   ├── Pedidos/
│   │   │   │   └── pedidos.routes.js
│   │   │   ├── Productos/
│   │   │   │   ├── colores.routes.js
│   │   │   │   ├── imagenes.routes.js
│   │   │   │   ├── productos.routes.js
│   │   │   │   └── tallas.routes.js
│   │   │   ├── Reservas/
│   │   │   │   └── reservasRoutes.js
│   │   │   └── Usuarios/
│   │   │       └── usuarios.routes.js
│   │   └── utils/
│   │       └── correo.js           # Envío de emails vía Resend HTTP API
│   ├── app.js                      # Entrada principal + cleanup de reservas
│   ├── .env
│   └── package.json
│
├── Cliente/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   └── ConfirmModal.jsx
│   │   ├── pages/
│   │   │   ├── categorias/
│   │   │   ├── checkout/
│   │   │   │   ├── Checkout.jsx
│   │   │   │   └── Checkout.css
│   │   │   ├── Dashboard/
│   │   │   ├── descuentos/
│   │   │   ├── login/
│   │   │   ├── miPerfil/
│   │   │   ├── pagos/
│   │   │   │   └── PagoResultado/
│   │   │   │       └── pagoResultado.jsx
│   │   │   ├── pedidos/
│   │   │   ├── productoDetalle/
│   │   │   │   ├── Productodetalle.jsx
│   │   │   │   └── Productodetalle.css
│   │   │   ├── productos/
│   │   │   ├── recuperarContrasena/
│   │   │   ├── tienda/
│   │   │   │   ├── Tienda.jsx
│   │   │   │   ├── Tienda.css
│   │   │   │   ├── TiendaAuth.jsx       # (en pages/tiendaAuht/)
│   │   │   │   └── TiendaAuth.css
│   │   │   ├── tiendaAuht/              # Nota: carpeta con typo intencional
│   │   │   │   ├── TiendaAuth.jsx
│   │   │   │   └── TiendaAuth.css
│   │   │   └── tiendaPerfil/
│   │   │       ├── Tiendaperfil.jsx
│   │   │       └── Tiendaperfil.css
│   │   ├── styles/
│   │   │   └── global.css
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.html
│   └── package.json
│
├── .gitignore
└── moda_magica_datos.sql
```
