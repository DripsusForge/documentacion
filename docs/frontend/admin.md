---
id: admin
title: Panel de administración
sidebar_position: 3
---

# Panel de administración

## Login (`pages/login/`)

- Validación de correo y contraseña en tiempo real
- Toggle show/hide contraseña
- Enlace a recuperar contraseña
- Al iniciar sesión guarda en `sessionStorage` y redirige a `/dashboard`
- Solo acepta roles 1 (superAdmin) y 2 (admin)

---

## Recuperar contraseña (`pages/recuperarContrasena/`)

3 pasos con indicador visual de progreso:

1. **Correo** — ingresa el correo y envía el código
2. **Código** — 6 inputs individuales con navegación automática entre dígitos y soporte de paste
3. **Nueva contraseña** — requisitos visuales en tiempo real (longitud, mayúscula, minúscula, número, especial)

---

## Dashboard (`pages/Dashboard/`)

- 4 tarjetas de estadísticas: clientes, ingresos, pedidos, tasa de conversión
- Tabla de pedidos recientes
- Lista de tareas con toggle de completado al hacer clic
- Feed de actividad reciente

---

## Categorías (`pages/categorias/`)

- Tabla paginada (4 por página) con filtro por estado y búsqueda por nombre
- Badge de estado con punto de color (activo = verde, inactivo = gris)
- Modal crear/editar con validación en tiempo real (solo letras)
- El nombre de la categoría no puede repetirse

---

## Productos (`pages/productos/`)

La página más compleja del panel.

**Tabla:** imagen principal, categorías como pills dorados, colores como puntos, stock total con color según nivel (rojo = 0, amarillo < 5, normal si más).

**Modal crear/editar:**

- **Imágenes** — drag & drop o clic para seleccionar (JPG, PNG, WEBP). Gestión de imagen principal con botón estrella. Eliminación física del archivo al borrar.
- **Categorías** — botones toggle, múltiple selección
- **Colores** — paleta de puntos clicables. Botón para crear nuevo color con color picker + campo hex
- **Tallas por grupos** — tabs por tipo: Ropa adulto, Bebés, Niños, Zapatos niños, Zapatos adulto, Pantalones, Conjuntos, Tendidos, Toallas
- **Stock** — input de cantidad por variante (color + talla)
- **Crear talla nueva** — se puede crear una talla nueva directamente desde el modal, asignándola a un grupo

---

## Usuarios (`pages/usuarios/`)

- Tabla con avatar generado de iniciales, nombre completo, correo, teléfono, dirección, fechas, rol y estado
- Filtro por rol (Superadmin, Admin, Cliente) y estado, búsqueda por nombre o correo
- Modal con las mismas validaciones del backend
- En edición: si el campo contraseña está vacío, se conserva la contraseña actual

**Regla de eliminación:** si el usuario tiene pedidos asociados, el backend retorna error 400 y el `ConfirmModal` muestra el mensaje sin botón de confirmar.

---

## Pedidos (`pages/pedidos/`)

**Cards de estadísticas:** total de pedidos, pendientes, en tránsito (procesando + enviado), entregados.

**Modal crear pedido:**

| Sección | Descripción |
|---|---|
| Sesión | Muestra automáticamente el usuario logueado como cliente del pedido |
| Dirección | Selector de direcciones existentes del cliente + opción de crear nueva inline |
| Descuento | Input de código con validación al presionar Enter o botón Aplicar |
| Productos | Selector producto/color → tallas filtradas → cantidad → Agregar |
| Preview | Imagen y detalles del producto seleccionado antes de agregar |
| Ítems | Lista con quitar individual y precio parcial |
| Resumen | Subtotal, descuento y total final en tiempo real |

**Modal ver pedido:** detalle completo del pedido con info del cliente, productos, resumen financiero y botones para cambiar estado.

**Eliminación:** solo permitida si el estado es `entregado`. Si no, el backend retorna el error y el `ConfirmModal` lo muestra sin botón de confirmar.

---

## Descuentos (`pages/descuentos/`)

- Tabla con código en formato monospace, barra de progreso de usos, badge de cantidad de prendas
- Modal con grid visual de tarjetas de prendas (imagen + nombre + precio)
- Buscador de prendas dentro del modal
- El estado `vencido` solo lo asigna el sistema automáticamente; el formulario solo muestra `activo` e `inactivo`

---

## Mi Perfil (`pages/miPerfil/`)

- Carga los datos del usuario desde `GET /api/usuarios/:id` usando el ID de la sesión activa
- Avatar con color generado a partir del nombre
- Secciones: datos personales, datos de cuenta, permisos del rol con cards visuales diferenciadas por color (dorado = superadmin, azul = admin)
