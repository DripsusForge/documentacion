---
id: tienda
title: Tienda pública
sidebar_position: 4
---

# Tienda pública

Archivos: `pages/tienda/Tienda.jsx`, `Tienda.css`, `TiendaAuth.jsx`, `TiendaAuth.css`

## Navbar

- Logo con gradiente dorado animado
- Mega menú por categoría (MUJER, HOMBRE, NIÑOS, DEPORTE, TECNOLOGÍA, BELLEZA) con columnas de subcategorías y tarjeta promocional con descuento
- Buscador con dropdown de sugerencias: categorías que coincidan + primeros 5 productos. Si no hay resultados, muestra "Sin resultados para..."
- Botón de cuenta — abre `TiendaAuth`
- Botón de carrito con contador de ítems
- Menú hamburguesa en móvil

---

## Hero

Fondo animado en **CSS puro** — sin canvas, sin JavaScript. Usa 6 capas `div` con gradientes y animaciones `@keyframes` independientes que simulan el efecto de tela dorada líquida:

| Capa | Efecto |
|---|---|
| `t-gold-base` | Gradiente base diagonal dorado |
| `t-gold-wave1` | Banda brillante principal animada |
| `t-gold-wave2` | Banda secundaria más sutil |
| `t-gold-wave3` | Reflejo superior suave |
| `t-gold-shine` | Brillo central radial pulsante |
| `t-gold-crease` | Pliegue oscuro para dar profundidad |

Sobre el fondo: overlay oscuro a la izquierda, eyebrow, título con `em` en gradiente dorado, subtítulo y botón CTA.

---

## Catálogo

- Carga productos desde `GET /api/productos` al montar
- Solo muestra productos con `estado = 'activo'` y `stock_total > 0`
- Filtro por categoría (pills), búsqueda por nombre, ordenar por precio asc/desc o nombre
- Grid responsive (`auto-fill`, mínimo 230px por columna)
- Cards con imagen, precio, nombre, categoría, colores disponibles como puntos. Al hover: botón "Ver producto" y puntos de color

---

## Modal de producto

Al hacer clic en una card:

1. Selecciona color (puntos circulares con outline al seleccionar)
2. Las tallas disponibles se filtran según el color elegido
3. Botón "Agregar al carrito" — valida que color y talla estén seleccionados, muestra toast si no
4. Al agregar: llama a `POST /api/reservas` para reservar stock temporalmente (15 min)

---

## Carrito (drawer lateral)

- Animación slide-in desde la derecha con backdrop blur
- Cambiar cantidad con botones +/−; al cambiar llama a `POST /api/reservas` para renovar la reserva
- Eliminar ítems → llama a `DELETE /api/reservas` para liberar el stock reservado
- Total en tiempo real formateado en COP (`Intl.NumberFormat`)
- Botón "Finalizar compra" → navega a `/tienda/checkout`
- Botón "Seguir comprando" cierra el drawer

---

## Sección Waterfall

Fondo oscuro con SVG de olas doradas animadas (gradientes SVG). Muestra 3 características del negocio: Compra segura, Soporte 7/7, Sin devoluciones.

---

## TiendaAuth (`TiendaAuth.jsx`)

Modal con dos paneles:
- **Izquierdo** — decorativo con efecto dorado animado y bullets de características
- **Derecho** — formulario con 3 modos navegables entre sí

### Login
- `POST /api/auth/login-cliente`
- Solo acepta rol 3 (cliente)
- Guarda sesión en `sessionStorage` bajo la clave `tiendaSesion`

### Registro
**Paso 1 — Datos:**
- Nombre, apellido, correo, teléfono, dirección, contraseña, confirmar contraseña
- Validaciones en tiempo real iguales al backend

**Paso 2 — Verificación:**
- `POST /api/auth/register` → recibe `userId`
- 6 inputs de código con navegación automática
- `POST /api/auth/verify` para activar la cuenta
- Reenvío de código con contador de 60 segundos

### Recuperar contraseña
4 pasos:

| Paso | Endpoint | Descripción |
|---|---|---|
| 1 | `POST /api/auth/recovery-request` | Envía código al correo, recibe `userId` |
| 2 | `POST /api/auth/recovery-verify` | Verifica el código de 6 dígitos |
| 3 | `POST /api/auth/recovery-reset` | Guarda la nueva contraseña |
| 4 | — | Pantalla de éxito, redirige al login |
