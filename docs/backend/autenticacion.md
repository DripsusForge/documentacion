---
id: autenticacion
title: Autenticación
sidebar_position: 2
---

# Autenticación

Archivo: `controllers/Auth/authController.js`  
Rutas: `routes/Auth/authRoutes.js`

## Middleware (`middleware/authMiddleware.js`)

Tres funciones exportadas:

| Función | Descripción |
|---|---|
| `verifyToken` | Verifica el JWT del header `Authorization: Bearer <token>` |
| `isAdmin` | Permite solo roles 1 (Superadmin) y 2 (Admin) |
| `isSuperadmin` | Permite solo rol 1 (Superadmin) |

## Rutas públicas

### Login admin

```http
POST /api/auth/login
```

Solo acepta usuarios con `id_rol = 1` (Superadmin) o `id_rol = 2` (Admin). Rechaza cuentas inactivas.

**Body:**
```json
{
  "correo": "luis.gomez@meil.com",
  "contrasena": "MiClave123"
}
```

**Respuesta:**
```json
{
  "token": "eyJ...",
  "rol": 1,
  "nombre": "luis",
  "apellido": "gomez",
  "correo": "luis.gomez@meil.com",
  "id": 11
}
```

Token con expiración de **8 horas**.

---

### Login cliente (tienda)

```http
POST /api/auth/login-cliente
```

Solo acepta `id_rol = 3` (Cliente). Token con expiración de **24 horas**.

---

### Registro de cliente

```http
POST /api/auth/register
```

Crea el usuario con estado `inactivo` y envía un código de 6 dígitos por email para verificación.

**Body:**
```json
{
  "primer_nombre": "Juan",
  "primer_apellido": "Pérez",
  "correo": "juan@mail.com",
  "contrasena": "Clave123",
  "telefono": "3001234567"
}
```

---

### Verificar cuenta

```http
POST /api/auth/verify
```

```json
{ "userId": 5, "codigo": "482931" }
```

Cambia el estado del usuario a `activo` y limpia el `verify_code`.

---

### Reenviar código de verificación

```http
POST /api/auth/resend-code
```

```json
{ "userId": 5 }
```

---

### Recuperar contraseña (paso 1 — código)

```http
POST /api/auth/recovery-request
```

Envía un código de 6 dígitos al correo. Responde con `userId`.

---

### Recuperar contraseña (paso 2 — verificar código)

```http
POST /api/auth/recovery-verify
```

```json
{ "userId": 5, "codigo": "738201" }
```

---

### Recuperar contraseña (paso 3 — nueva contraseña)

```http
POST /api/auth/recovery-reset
```

```json
{ "userId": 5, "nuevaContrasena": "NuevaClave123" }
```

Mínimo 6 caracteres.

---

## Rutas protegidas (`verifyToken + isAdmin`)

### Obtener todos los usuarios

```http
GET /api/auth/users
```

### Actualizar rol

```http
PUT /api/auth/update-role
```

```json
{ "id": 5, "nuevoRol": 2 }
```

Roles permitidos: 1, 2, 3.

---

## Recuperación por link (`routes/Auth/recoveryRoutes.js`)

Flujo alternativo que envía un link al email con token UUID.

```http
POST /api/recovery/solicitar
```

```json
{ "correo": "usuario@mail.com" }
```

```http
POST /api/recovery/nueva-password
```

```json
{ "token": "uuid-del-link", "contrasena": "NuevaClave1" }
```

Validaciones de la contraseña: mínimo 6 caracteres, una mayúscula, una minúscula, un número.
