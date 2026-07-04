---
id: instalacion
title: Instalación
sidebar_position: 2
---

# Instalación

## Requisitos previos

- Node.js >= 18
- PostgreSQL 18
- Git

## 1. Clonar el repositorio

```bash
git clone https://github.com/SantiagoGiraldoRodriguez/ModaMagica.git
cd ModaMagica
```

## 2. Configurar la base de datos

1. Abrir pgAdmin
2. Crear una base de datos llamada `ModaMagica`
3. Importar el archivo SQL:

```bash
psql -U postgres -d ModaMagica -f ModaMagica_limpio.sql
```

---

## 3. Configurar el backend

```bash
cd backend
npm install
```

Crear el archivo `backend/.env`:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=ModaMagica
JWT_SECRET=modamagica_secret_key_2024
EMAIL_USER=tucorreo@gmail.com
EMAIL_PASS=tucontraseñadeaplicacion
FRONTEND_URL=http://localhost:5173
```

Iniciar el servidor:

```bash
npm start
```

El backend corre en `http://localhost:3000`

---

## 4. Configurar el frontend (Cliente)

```bash
cd Cliente
npm install
npm run dev
```

El frontend corre en `http://localhost:5173`

---

## Verificar instalación

| URL | Qué abre |
|---|---|
| `http://localhost:3000/api/productos` | API del backend |
| `http://localhost:5173/login` | Panel de administración |
| `http://localhost:5173/tienda` | Tienda pública |

:::tip
El backend y el frontend deben estar corriendo al mismo tiempo en terminales separadas.
:::
