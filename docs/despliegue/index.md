---
id: index
title: Despliegue
sidebar_position: 1
---

# Despliegue

El proyecto está desplegado en **Render (free tier)**.

## Servicios en Render

| Servicio | Tipo | URL |
|---|---|---|
| Backend (Node.js/Express) | Web Service | `https://<backend>.onrender.com` |
| Frontend Admin (Vite/React) | Static Site | `https://modamagica-frontend.onrender.com` |
| Base de datos | PostgreSQL | `dpg-d8rgtt7lk1mc73bt91fg-a.oregon-postgres.render.com` |

## Variables de entorno (backend)

| Variable | Descripción |
|---|---|
| `DB_HOST` | Host de la BD en Render |
| `DB_PORT` | Puerto PostgreSQL (5432) |
| `DB_USER` | Usuario de la BD |
| `DB_PASSWORD` | Contraseña de la BD |
| `DB_NAME` | Nombre de la BD (`modamagica_copn`) |
| `JWT_SECRET` | Secreto para firmar tokens JWT |
| `EMAIL_USER` | Correo registrado en Resend |
| `RESEND_API_KEY` | API Key de Resend para envío de emails |
| `MP_ACCESS_TOKEN` | Access token de Mercado Pago |
| `FRONTEND_URL` | URL del frontend (para back_urls de MP) |
| `BACKEND_URL` | URL del backend (para webhook de MP) |

## Variable de entorno (frontend)

| Variable | Descripción |
|---|---|
| `VITE_API_URL` | URL base del backend (sin `/api`) |

## Consideraciones del free tier

- **Disco efímero**: las imágenes subidas no persisten entre deploys. Se usa `multer memoryStorage` para evitar dependencia del disco.
- **CORS**: el origen `https://modamagica-frontend.onrender.com` está en la lista blanca del backend.
- **Emails (Resend)**: en el plan gratuito solo se puede enviar al correo registrado en la cuenta de Resend hasta verificar un dominio personalizado.
- **Webhook Mercado Pago**: la `notification_url` debe apuntar a la URL pública del backend en Render (`BACKEND_URL`). No funciona en `localhost`.

## SPA — Rewrite Rule

Para que las rutas de React Router funcionen al acceder directamente a una URL (como `/tienda/checkout`), se debe configurar la regla de rewrite en Render:

- Source: `/*`
- Destination: `/index.html`

## SMTP en Render

Render bloquea el puerto 25 y conexiones SMTP salientes en el free tier. Por eso se usa **Resend HTTP API** en lugar de Nodemailer/Gmail.
