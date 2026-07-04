---
id: categorias
title: Categorías
sidebar_position: 4
---

# Categorías

Archivo: `controllers/Categorias/categorias.controller.js`  
Rutas: `routes/categorias/categorias.routes.js`

## Endpoints

```http
GET    /api/categorias
GET    /api/categorias/:id
POST   /api/categorias
PUT    /api/categorias/:id
DELETE /api/categorias/:id
```

## Crear categoría

```http
POST /api/categorias
```

```json
{
  "nombre_categoria": "Ropa Deportiva",
  "descripcion": "Prendas para deporte y actividad física"
}
```

Se crea con `estado = 'activo'` automáticamente.

## Editar categoría

```http
PUT /api/categorias/:id
```

```json
{
  "nombre_categoria": "Ropa Deportiva",
  "descripcion": "Descripción actualizada",
  "estado": "inactivo"
}
```

## Validaciones

| Campo | Reglas |
|---|---|
| `nombre_categoria` | Obligatorio, solo letras (con tildes), máximo 100 caracteres, único en el sistema |
| `descripcion` | Obligatoria, máximo 255 caracteres |
| `estado` | `activo` o `inactivo` (solo en edición) |

En edición verifica que no exista **otra** categoría con el mismo nombre (distinta al ID actual).

:::note
El código de eliminación tiene comentada la verificación de productos asociados. Actualmente permite eliminar una categoría aunque tenga productos, gracias al `ON DELETE CASCADE` de la tabla `producto_categoria`.
:::


## Informe de Calidad y Pruebas

### Calidad
- Validación de campos obligatorios (`nombre_categoria`, `descripcion`).
- Control de longitud máxima permitida.
- Prevención de registros duplicados.
- Manejo de errores de base de datos y respuestas HTTP consistentes.

### Pruebas Ejecutadas
- Consulta de todas las categorías.
- Consulta por ID existente y no existente.
- Creación exitosa.
- Validaciones de nombre y descripción.
- Detección de categorías duplicadas.
- Actualización exitosa y validaciones.
- Eliminación exitosa y manejo de registros inexistentes.
- Cobertura de errores 500 en operaciones CRUD.
