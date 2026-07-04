---
id: reservas
title: Reservas de Stock
sidebar_position: 9
---

# Reservas de Stock

Archivo: `controllers/Reservas/reservas.controller.js`  
Rutas: `routes/Reservas/reservasRoutes.js`

Sistema de reserva temporal que bloquea stock por 15 minutos cuando un cliente agrega un producto al carrito, evitando sobreventa entre sesiones concurrentes.

## Endpoints

```http
POST   /api/reservas
DELETE /api/reservas
DELETE /api/reservas/sesion
GET    /api/reservas/disponibilidad
```

## Crear o renovar reserva

```http
POST /api/reservas
```

```json
{
  "session_id": "mm-session-abc123",
  "id_producto_color": 34,
  "id_talla": 9,
  "cantidad": 2
}
```

Si ya existe una reserva de esa `session_id` para la misma variante (`id_producto_color` + `id_talla`), la actualiza y reinicia el tiempo de expiración (15 minutos desde ahora).

Antes de reservar:
1. Limpia reservas vencidas
2. Consulta `stock_actual` en `inventario_color_talla`
3. Suma reservas activas de **otras sesiones** sobre esa variante
4. Si `cantidad > (stock_real - reservado_por_otros)` → 409

**Respuesta exitosa:**
```json
{ "message": "Reserva confirmada.", "expira_en": "2026-06-24T01:07:00.000Z" }
```

## Liberar reserva puntual

```http
DELETE /api/reservas
```

```json
{
  "session_id": "mm-session-abc123",
  "id_producto_color": 34,
  "id_talla": 9
}
```

Se llama cuando el cliente quita un producto del carrito, para liberar el stock de inmediato sin esperar los 15 minutos.

## Liberar todas las reservas de una sesión

```http
DELETE /api/reservas/sesion
```

```json
{ "session_id": "mm-session-abc123" }
```

Se llama al confirmar la compra (el stock real ya se descontó) o si el cliente vacía el carrito completo.

## Consultar disponibilidad

```http
GET /api/reservas/disponibilidad?id_producto_color=34&id_talla=9&session_id=mm-session-abc123
```

Devuelve el stock disponible descontando las reservas de otras sesiones:

```json
{
  "stock_real": 10,
  "reservado_por_otros": 3,
  "disponible": 7
}
```

`session_id` es opcional. Si se incluye, excluye las propias reservas del cálculo de "reservado por otros".

## Tabla `reserva_stock`

| Columna | Tipo | Descripción |
|---|---|---|
| `id_reserva` | integer PK | Auto-incremental |
| `session_id` | varchar(100) | ID de sesión del cliente (de `localStorage` bajo la clave `mm_session_id`) |
| `id_producto_color` | integer FK | Variante reservada |
| `id_talla` | integer FK | Talla reservada |
| `cantidad` | integer | Unidades reservadas |
| `creado_en` | timestamp | Timestamp de creación |
| `expira_en` | timestamp | Expiración (15 min desde creación/renovación) |

Restricción UNIQUE sobre `(session_id, id_producto_color, id_talla)` — permite el `ON CONFLICT ... DO UPDATE`.
