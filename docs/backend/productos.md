---
id: productos
title: Productos
sidebar_position: 5
---

# Productos

Archivo: `controllers/Productos/productos.controller.js`  
Rutas: `routes/Productos/productos.routes.js`

## Endpoints principales

```http
GET    /api/productos
GET    /api/productos/:id
POST   /api/productos
PUT    /api/productos/:id
DELETE /api/productos/:id
```

## Obtener todos

`GET /api/productos` devuelve cada producto con `colores`, `categorias` y `stock_total` calculado desde `inventario_color`.

## Crear producto

```http
POST /api/productos
```

```json
{
  "nombre_producto": "Camiseta deportiva",
  "descripcion": "Para actividad física",
  "precio_unitario": 45000,
  "categorias": [1, 4],
  "colores": [
    {
      "id_color": 1,
      "tallas": [
        { "id_talla": 3, "stock_actual": 10 },
        { "id_talla": 4, "stock_actual": 5 }
      ]
    }
  ]
}
```

También acepta `variantes` en lugar de `colores`:
```json
{
  "variantes": [
    { "id_color": 1, "id_talla": 3, "stock_actual": 10 }
  ]
}
```

O `id_categoria` (número) en lugar de `categorias` (array).

Toda la operación corre en una **transacción PostgreSQL** (BEGIN/COMMIT/ROLLBACK).

## Validaciones

| Campo | Reglas |
|---|---|
| `nombre_producto` | Obligatorio, máximo 150 caracteres, único en el sistema |
| `categorias` / `id_categoria` | Al menos una categoría |
| `precio_unitario` | Obligatorio, mayor o igual a 0 |

## Eliminar producto

```http
DELETE /api/productos/:id
```

Elimina en transacción: detalles de carrito → detalles de pedido → movimientos de inventario → `inventario_color_talla` → `inventario_color` → `producto_color` → inventario → imágenes → `descuento_producto` → `producto_categoria` → producto.

---

## Colores

Archivo: `controllers/Productos/colores.controller.js`

```http
GET    /api/colores
POST   /api/colores
PUT    /api/colores/:id
DELETE /api/colores/:id
```

### Crear color
```json
{ "nombre_color": "Azul cielo", "hex_code": "#79ACE2" }
```

Validaciones: `nombre_color` obligatorio, `hex_code` debe cumplir el patrón `#RRGGBB` (6 dígitos hex). El `PUT` acepta actualizar solo `nombre_color` o solo `hex_code` usando `COALESCE`.

---

## Tallas

Archivo: `controllers/Productos/tallas.controller.js`

```http
GET    /api/tallas
POST   /api/tallas
PUT    /api/tallas/:id
DELETE /api/tallas/:id
```

### Crear talla
```json
{ "nombre_talla": "XL" }
```

`nombre_talla` obligatorio y único.

---

## Imágenes

Archivo: `controllers/Productos/imagenes.controller.js`  
Rutas: `routes/Productos/imagenes.routes.js`

```http
GET    /api/imagenes/:id_producto
POST   /api/imagenes/:id_producto
PUT    /api/imagenes/principal/:id_imagen
DELETE /api/imagenes/:id_imagen
```

### Subir imágenes

```http
POST /api/imagenes/:id_producto
Content-Type: multipart/form-data
```

Campo del formulario: `imagenes` (múltiples archivos, formatos: `jpg`, `jpeg`, `png`, `webp`).

La primera imagen subida (cuando no hay imágenes previas) se marca automáticamente como `es_principal = 1`. Las siguientes como `0`.

### Marcar como principal

```http
PUT /api/imagenes/principal/:id_imagen
```

Desmarca todas las imágenes del producto como no principales y marca la seleccionada.

### Eliminar imagen

```http
DELETE /api/imagenes/:id_imagen
```

Elimina el registro de la DB y también el archivo físico en `uploads/productos/` si existe.


## Informe de Calidad y Pruebas

### Calidad
- Validación de nombre, precio y categorías.
- Soporte para variantes, colores y tallas.
- Uso de transacciones PostgreSQL para integridad de datos.
- Implementación de rollback ante fallos.

### Pruebas Ejecutadas
- Consulta de productos y detalle por ID.
- Validaciones de creación y actualización.
- Creación con categorías, variantes, colores y tallas.
- Prevención de productos duplicados.
- Actualización de inventario por color y talla.
- Verificación de transacciones y rollback.
- Eliminación de productos y datos relacionados.
