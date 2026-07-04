---
id: index
title: Base de datos
sidebar_position: 1
---

# Base de datos

Motor: **PostgreSQL** (Render PostgreSQL en producción).

## Tablas del sistema

El esquema cuenta con **18 tablas activas**:

| Tabla | Descripción |
|---|---|
| `usuario` | Clientes y administradores del sistema |
| `categoria_producto` | Categorías de productos |
| `producto` | Catálogo de prendas |
| `producto_categoria` | Relación N:N producto ↔ categoría |
| `color` | Colores disponibles |
| `talla` | Tallas disponibles |
| `producto_color` | Variante producto+color (clave para inventario) |
| `inventario_color` | Stock total por variante producto+color |
| `inventario_color_talla` | Stock por variante producto+color+talla |
| `imagen_producto` | Imágenes de cada producto |
| `descuentos` | Códigos de descuento con control de uso |
| `descuentos_usos` | Registro de uso por cliente (un uso por cliente) |
| `pedido` | Cabecera de cada orden de compra |
| `detalle_pedido` | Líneas de cada pedido |
| `direccion_envio` | Direcciones de entrega de los clientes |
| `historial_estado_pedido` | Trazabilidad de cambios de estado del pedido |
| `movimiento_inventario` | Auditoría de entradas y salidas de stock |
| `reserva_stock` | Reserva temporal de stock durante el checkout (15 min) |

## Columnas de pago en `pedido`

La tabla `pedido` incluye columnas para la integración con Mercado Pago:

| Columna | Tipo | Descripción |
|---|---|---|
| `estado_pago` | varchar(20) | `pendiente` / `pagado` / `rechazado` |
| `metodo_pago` | varchar(30) | Tipo de pago (ej. `credit_card`) |
| `referencia_pago` | varchar(100) | ID del pago en Mercado Pago |
| `preference_id` | varchar(100) | ID de preferencia de Checkout Pro |

## Tabla `reserva_stock`

Reserva temporal de stock mientras el cliente está en el carrito. Expira en 15 minutos.

```sql
CREATE TABLE reserva_stock (
  id_reserva        SERIAL PRIMARY KEY,
  session_id        VARCHAR(100) NOT NULL,
  id_producto_color INTEGER NOT NULL,
  id_talla          INTEGER NOT NULL,
  cantidad          INTEGER NOT NULL CHECK (cantidad > 0),
  creado_en         TIMESTAMP DEFAULT now() NOT NULL,
  expira_en         TIMESTAMP NOT NULL,
  UNIQUE (session_id, id_producto_color, id_talla)
);
```

## Tabla `descuentos_usos`

Registra qué cliente usó qué código de descuento, para evitar usos repetidos.

```sql
CREATE TABLE descuentos_usos (
  id            SERIAL PRIMARY KEY,
  id_descuento  INTEGER NOT NULL,
  id_usuario    INTEGER NOT NULL,
  fecha_uso     TIMESTAMP DEFAULT now() NOT NULL
);
```

## Conexión en producción (Render)

```
Host:     dpg-d8rgtt7lk1mc73bt91fg-a.oregon-postgres.render.com
Database: modamagica_copn
User:     modamagica_copn_user
```
