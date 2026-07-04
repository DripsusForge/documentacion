---
id: index
title: Frontend
sidebar_position: 1
---

# Frontend

El frontend está construido con **React + Vite** y usa **Bootstrap Icons** para los íconos.

## Tecnologías

| Tecnología | Uso |
|---|---|
| React 18 | UI |
| Vite | Bundler |
| React Router DOM | Rutas |
| Bootstrap Icons (`bi-*`) | Íconos |
| Axios | Peticiones HTTP (admin) |
| CSS custom properties | Theming (`var(--gold)`, `var(--text)`, etc.) |

## Estructura de archivos

```
Cliente/src/
├── components/
│   ├── Layout.jsx         # Navbar + Sidebar + Footer
│   └── ConfirmModal.jsx   # Modal de confirmación reutilizable
├── pages/
│   ├── categorias/
│   │   ├── Categorias.jsx
│   │   └── Categorias.css
│   ├── Dashboard/
│   │   └── Dashboard.jsx
│   ├── descuentos/
│   │   ├── Descuentos.jsx
│   │   └── Descuentos.css
│   ├── login/
│   │   ├── Login.jsx
│   │   └── Login.css
│   ├── miPerfil/
│   │   ├── MiPerfil.jsx
│   │   └── MiPerfil.css
│   ├── pedidos/
│   │   ├── Pedidos.jsx
│   │   └── Pedidos.css
│   ├── productos/
│   │   ├── Productos.jsx
│   │   └── Productos.css
│   ├── recuperarContrasena/
│   │   ├── RecuperarContrasena.jsx
│   │   └── RecuperarContrasena.css
│   └── tienda/
│       ├── Tienda.jsx
│       ├── Tienda.css
│       ├── TiendaAuth.jsx
│       └── TiendaAuth.css
├── styles/
│   └── global.css         # Variables CSS, dark mode, componentes base
├── App.jsx                # Rutas y guards
├── main.jsx
└── index.html
```

---

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

**`RutaProtegida`** — verifica que exista `adminSesion` en `sessionStorage`, si no redirige a `/login`.

**`SoloSuperadmin`** — además verifica que `sesion.rol === 'superadmin'`, si no redirige a `/dashboard`.

---

## Sesión del administrador

La sesión se guarda en `sessionStorage` bajo la clave `adminSesion`:

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

El token se envía en las peticiones protegidas:
```http
Authorization: Bearer eyJ...
```

---

## Theming (dark mode)

El dark mode se activa añadiendo la clase `dark-mode` al `div` raíz en `App.jsx`. Los colores cambian vía CSS custom properties definidas en `global.css`:

```css
:root {
  --bg: #f4f6fb;
  --card: #ffffff;
  --text: #1e293b;
  --accent: #4a67ff;
  --gold: #C9962A;
  /* ... */
}
.dark-mode {
  --bg: #0f172a;
  --card: #1e293b;
  --text: #f1f5f9;
  --accent: #6366f1;
  /* ... */
}
```

---

## Layout (`components/Layout.jsx`)

El layout del panel admin incluye:

- **Navbar** fija con logo, toggle de sidebar, toggle dark/light, menú de perfil con dropdown
- **Sidebar** colapsable (230px ↔ 68px) con menú filtrado por rol:
  - `superadmin` ve: Tablero, Gestión de Usuarios, Inventario (Categorías + Productos), Pedidos, Descuentos
  - `admin` ve: Tablero, Inventario
- **Footer** sincronizado con el estado del sidebar

---

## ConfirmModal (`components/ConfirmModal.jsx`)

Modal de confirmación reutilizable en todos los módulos:

```jsx
<ConfirmModal
  show={confirm.show}
  titulo="¿Eliminar categoría?"
  mensaje="Esta acción no se puede deshacer."
  error={deleteError}           // Si hay error, cambia el ícono y muestra el mensaje
  onCancel={() => setConfirm({ show: false, id: null })}
  onConfirm={() => eliminar(confirm.id)}
/>
```

Si `error` tiene valor, muestra el error en lugar del botón de confirmar.

---

## Módulos del panel admin

### Login (`pages/login/Login.jsx`)
- Validación de correo y contraseña en tiempo real
- Toggle show/hide contraseña
- Enlace a recuperar contraseña
- Al iniciar sesión guarda en `sessionStorage` y redirige a `/dashboard`

### RecuperarContrasena (`pages/recuperarContrasena/`)
3 pasos visuales con indicador de progreso:
1. Ingresa correo → envía código
2. Código de 6 dígitos con inputs individuales (navegación automática entre dígitos, paste)
3. Nueva contraseña con requisitos visuales en tiempo real

### Dashboard (`pages/Dashboard/Dashboard.jsx`)
- 4 tarjetas de estadísticas (clientes, ingresos, pedidos, conversión) — datos estáticos de demostración
- Tabla de pedidos recientes
- Lista de tareas con toggle de completado
- Feed de actividad reciente

### Categorías (`pages/categorias/`)
- Tabla con paginación (4 por página)
- Filtro por estado, búsqueda por nombre
- Modal crear/editar con validación de solo letras en tiempo real
- Badge de estado con color

### Productos (`pages/productos/`)
La página más compleja del panel:
- Tabla con imagen principal, categorías como pills, colores como puntos, stock total
- Modal con:
  - Drag & drop de imágenes (JPG, PNG, WEBP) + gestión de imagen principal
  - Categorías como botones toggle
  - Colores con selector de paleta visual y creación de nuevos colores (color picker + hex)
  - Tallas agrupadas por tipo (ropa adulto, bebés, niños, zapatos niños, zapatos adulto, pantalones, conjuntos, tendidos, toallas)
  - Stock individual por variante (color + talla)
  - Creación de tallas personalizadas con asignación a grupo

### Usuarios (`pages/usuarios/`)
- Tabla con avatar, nombre completo, correo, teléfono, dirección, fecha nacimiento, rol y estado
- Filtro por rol y estado, búsqueda
- Modal con validación completa igual que el backend
- En edición: contraseña es opcional (si está vacía se conserva la actual)

### Pedidos (`pages/pedidos/`)
- Cards de estadísticas (total, pendientes, en tránsito, entregados)
- Modal crear pedido:
  - Sesión del usuario logueado como cliente automático
  - Selector de dirección existente o crear nueva dirección inline
  - Código de descuento con validación por debounce (Enter o botón Aplicar)
  - Selector producto/color → tallas filtradas → cantidad → botón Agregar
  - Preview del producto seleccionado con imagen
  - Lista de ítems con quitar individual
  - Resumen con subtotal, descuento y total final
- Modal ver pedido: detalle completo + cambio de estado con botones por estado
- Eliminación solo permitida si el estado es `entregado` (el error lo muestra el `ConfirmModal`)

### Descuentos (`pages/descuentos/`)
- Tabla con barra de progreso de usos, badge de código en monospace, badge de prendas
- Modal con grid de tarjetas visuales de prendas con imagen, nombre y precio
- Buscador de prendas dentro del modal
- Estado `vencido` solo lo asigna el sistema, no el formulario

### Mi Perfil (`pages/miPerfil/`)
- Carga los datos desde `GET /api/usuarios/:id` usando el ID de la sesión
- Avatar con color basado en el nombre
- Secciones: datos personales, datos de cuenta, permisos del rol con cards visuales

---

## Tienda pública (`pages/tienda/`)

### Navbar
- Logo con gradiente dorado animado
- Mega menú por categoría (MUJER, HOMBRE, NIÑOS, DEPORTE, TECNOLOGÍA, BELLEZA) con columnas y tarjeta promocional
- Buscador con dropdown de sugerencias (categorías + productos)
- Botón de cuenta (abre `TiendaAuth`) y carrito con contador

### Hero
- Fondo animado CSS puro (capas `div` con gradientes y animaciones `@keyframes`)
- Sin canvas, sin JavaScript — solo CSS

### Catálogo
- Grid responsive con filtro por categoría (pills) y búsqueda
- Ordenar por precio asc/desc o nombre
- Cards con imagen, precio, nombre, categoría, colores disponibles
- Hover: botón "Ver producto" y puntos de color

### Modal de producto
- Selección de color (puntos circulares)
- Tallas filtradas por color seleccionado
- Botón agregar al carrito

### Carrito (drawer lateral)
- Animación slide-in desde la derecha
- Cambiar cantidad, eliminar ítems
- Total en tiempo real formateado en COP
- Botón "Finalizar compra" (sin integración de pago)

### TiendaAuth (`pages/tienda/TiendaAuth.jsx`)
Modal con dos paneles: decorativo (dorado animado) + formulario. Tres modos:

- **Login** — `POST /api/auth/login-cliente`
- **Registro** — `POST /api/auth/register` + verificación con código de 6 dígitos
- **Recuperar contraseña** — 4 pasos: correo → código → nueva contraseña → éxito

La sesión del cliente se guarda en `sessionStorage` bajo la clave `tiendaSesion`.
