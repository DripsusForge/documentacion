---
id: tiendaperfil
title: Perfil del Cliente
sidebar_position: 6
---

# Perfil del Cliente

Archivo: `pages/tiendaPerfil/Tiendaperfil.jsx`, `Tiendaperfil.css`

Ruta: `/tienda/perfil`

## Vistas

### Sin sesión
Si no hay `tiendaSesion` en `sessionStorage`, muestra pantalla con botón para iniciar sesión.

### Datos personales
Muestra nombre, apellido, correo, teléfono y dirección del cliente. Botón "Editar" abre la vista de edición.

### Editar perfil
Formulario con campos: `primer_nombre`, `segundo_nombre`, `primer_apellido`, `segundo_apellido`, `telefono`, `direccion`.

```http
PUT /api/usuarios/:id/perfil-tienda
```

Solo permite editar datos personales, no correo ni contraseña.

### Mis pedidos
Lista los pedidos del cliente con:
- Número de pedido, fecha, total
- Estado del pedido con ícono y color diferenciado

| Estado | Color |
|---|---|
| `pendiente` | amarillo |
| `procesando` | azul |
| `enviado` | morado |
| `entregado` | verde |
| `cancelado` | rojo |

- Estado de pago (`estado_pago`)
- Detalle de cada producto: imagen, nombre, color, talla, cantidad, precio

## Barra superior

Componente `BarraSuperior` con botón "Volver a la tienda" y logo `✦ MODA MÁGICA ✦`.
