---
id: pedidos
title: Pedidos
sidebar_position: 7
---

# Pedidos

Archivo: `controllers/Pedidos/pedidos.controller.js`  
Rutas: `routes/Pedidos/pedidos.routes.js`

## Endpoints

```http
GET  /api/pedidos
GET  /api/pedidos/clientes
GET  /api/pedidos/productos
GET  /api/pedidos/descuento/:codigo
GET  /api/pedidos/direcciones/:id_usuario
GET  /api/pedidos/:id
POST /api/pedidos
POST /api/pedidos/direcciones
PUT  /api/pedidos/:id/estado
DELETE /api/pedidos/:id
```

## Obtener todos

`GET /api/pedidos` devuelve cada pedido con sus `detalles` (productos, colores, tallas, imagen principal). Ordenados por `id_pedido DESC`.

## Endpoints auxiliares

### Clientes activos
```http
GET /api/pedidos/clientes
```
Lista de usuarios con `estado = 'activo'`, ordenados por nombre.

### Productos disponibles
```http
GET /api/pedidos/productos
```
Productos con `estado = 'activo'` y `stock_actual > 0`, con color, talla, stock e imagen principal. Usado para el selector al crear un pedido.

### Validar código de descuento
```http
GET /api/pedidos/descuento/:codigo
```

Busca en la tabla `descuento` (legacy) y también en `descuentos`. Verifica que esté activo, no vencido y con usos disponibles.

### Direcciones del cliente
```http
GET /api/pedidos/direcciones/:id_usuario
```
Devuelve direcciones con `activa = 1`, ordenadas por `es_predeterminada DESC`.

### Agregar dirección
```http
POST /api/pedidos/direcciones
```
```json
{
  "id_usuario": 11,
  "departamento": "Antioquia",
  "ciudad": "Medellín",
  "direccion": "Calle 10 #20-30",
  "codigo_postal": "050001"
}
```
`codigo_postal` es opcional. Se crea con `es_predeterminada = 0` y `activa = 1`.

## Crear pedido

```http
POST /api/pedidos
```

```json
{
  "id_cliente": 11,
  "id_direccion": 7,
  "id_descuento": null,
  "items": [
    { "id_producto_color": 34, "id_talla": 9, "cantidad": 2 }
  ]
}
```

Corre en una **transacción completa**:

1. Valida precio y stock de cada ítem
2. Si hay `id_descuento`, busca en tabla `descuento` (activo, no vencido, con usos)
3. Calcula `total_pedido`, `descuento_aplicado` y `total_final`
4. Inserta el pedido
5. Por cada ítem: inserta `detalle_pedido`, descuenta `inventario_color_talla`, descuenta `inventario_color`, inserta `movimiento_inventario` (tipo `'salida'`)
6. Inserta en `historial_estado_pedido` con estado inicial `'pendiente'`
7. Si hubo descuento, suma 1 a `usos_actuales` en tabla `descuento`

Si cualquier paso falla → **ROLLBACK** completo.

## Cambiar estado del pedido

```http
PUT /api/pedidos/:id/estado
```

```json
{
  "estado_pedido": "procesando",
  "id_usuario_cambio": 11,
  "observacion": "Guía: 123456"
}
```

Estados válidos: `pendiente`, `procesando`, `enviado`, `entregado`, `cancelado`.

Registra automáticamente en `historial_estado_pedido` con el estado anterior y el nuevo. `id_usuario_cambio` es opcional (usa `1` por defecto). `observacion` es opcional.

## Columnas de pago en `pedido`

La tabla `pedido` incluye columnas para integración con Mercado Pago:

| Columna | Tipo | Descripción |
|---|---|---|
| `estado_pago` | varchar(20) | `pendiente` / `pagado` / `rechazado` |
| `metodo_pago` | varchar(30) | Tipo de pago reportado por MP (ej. `credit_card`) |
| `referencia_pago` | varchar(100) | ID del pago en Mercado Pago |
| `preference_id` | varchar(100) | ID de preferencia generado al iniciar el pago |

Estas columnas son actualizadas por el webhook de `/api/pagos/webhook`.

## Eliminar pedido

```http
DELETE /api/pedidos/:id
```

**Solo se puede eliminar si el estado es `'entregado'`.** Cualquier otro estado retorna 400.

Si el estado es `'entregado'`, elimina en orden en una transacción:
1. `historial_estado_pedido`
2. `comprobante_pago`
3. `movimiento_inventario`
4. `detalle_pedido`
5. `pedido`
