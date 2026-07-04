---
id: usuarios
title: Usuarios
sidebar_position: 3
---

# Usuarios

Archivo: `controllers/Usuarios/usuarios.controllers.js`  
Rutas: `routes/Usuarios/usuarios.routes.js`

## Endpoints

```http
GET    /api/usuarios
GET    /api/usuarios/:id
POST   /api/usuarios
PUT    /api/usuarios/:id
DELETE /api/usuarios/:id
```

## Crear usuario

```http
POST /api/usuarios
```

```json
{
  "primer_nombre": "Laura",
  "segundo_nombre": "María",
  "primer_apellido": "Martínez",
  "segundo_apellido": "García",
  "correo": "laura@mail.com",
  "telefono": "3001234567",
  "contrasena": "Clave123",
  "id_rol": 2,
  "direccion": "Calle 10 #20-30, Medellín",
  "fecha_nacimiento": "1998-07-22"
}
```

Se crea con `estado = 'activo'` automáticamente.

## Editar usuario

```http
PUT /api/usuarios/:id
```

Si `contrasena` viene vacía, se conserva la contraseña actual. Si viene con valor, se valida y se hashea.

## Eliminar usuario

```http
DELETE /api/usuarios/:id
```

Antes de eliminar verifica que el usuario no tenga pedidos asociados. Si tiene pedidos, responde 400. Si no tiene pedidos, elimina en este orden: comprobantes de pago → carrito → direcciones de envío → usuario.

## Validaciones

| Campo | Reglas |
|---|---|
| `primer_nombre` | Obligatorio, solo letras, 2–50 caracteres |
| `segundo_nombre` | Opcional; si se envía: solo letras, 2–50 caracteres |
| `primer_apellido` | Obligatorio, solo letras, 2–50 caracteres |
| `segundo_apellido` | Opcional; si se envía: solo letras, 2–50 caracteres |
| `correo` | Obligatorio, formato válido, único, máximo 100 caracteres, máximo un `@` |
| `telefono` | Obligatorio, solo números, 7–15 dígitos |
| `contrasena` | Obligatorio al crear; mínimo 6 caracteres, una mayúscula, una minúscula, un número |
| `id_rol` | Obligatorio; solo permite 1, 2 o 3 |
| `direccion` | Obligatorio, máximo 255 caracteres |
| `fecha_nacimiento` | Obligatorio, fecha válida, mayor de 18 años |

## Roles válidos en creación/edición

| ID | Rol |
|---|---|
| 1 | superAdmin |
| 2 | admin |
| 3 | cliente |


## Informe de Calidad y Pruebas

### Calidad
- Validación completa de datos personales.
- Verificación de formato de correo y teléfono.
- Reglas de seguridad para contraseñas.
- Control de roles, edad mínima y estados de usuario.
- Cifrado de contraseñas mediante bcrypt.

### Pruebas Ejecutadas
- Consultas generales y por ID.
- Validaciones de nombres, apellidos, correo y teléfono.
- Validaciones de contraseña en creación y edición.
- Creación y actualización de usuarios.
- Detección de correos duplicados.
- Eliminación controlada de usuarios.
- Manejo de errores y respuestas HTTP correspondientes.
