---
id: plataforma-tecnologica
title: Preparar la Plataforma Tecnológica
sidebar_position: 3
---

# Preparar la Plataforma Tecnológica

> Este documento amplía, con el detalle completo del proceso de aprovisionamiento, lo resumido en la sección de [Despliegue](/despliegue).

## Resumen ejecutivo

Describe la etapa en la que se definió y configuró la infraestructura de producción de ModaMágica (React/Vite + Node.js/Express + PostgreSQL) sobre **Render**, incluyendo la arquitectura resultante, los servicios aprovisionados, las variables de entorno y los problemas encontrados durante el despliegue.

## Arquitectura general

Tres servicios independientes, vinculados al mismo repositorio de GitHub (`SantiagoGiraldoRodriguez/ModaMagica`, rama `main`) con despliegue automático en cada commit:

| Servicio | Tipo | Tecnología | Estado |
|---|---|---|---|
| ModaMagica | PostgreSQL (Free) | Base de datos relacional | Available |
| modamagica-backend | Web Service | Node.js / Express | Deployed |
| modamagica-frontend | Static Site | React / Vite | Deployed |

Los servicios se comunican mediante peticiones HTTP y variables de entorno en lugar de rutas fijas como en desarrollo local.

## Variables de entorno

| Variable | Servicio | Propósito |
|---|---|---|
| `VITE_API_URL` | Frontend | URL base de la API consumida por el cliente |
| `FRONTEND_URL` | Backend | Configura CORS y redirecciones (p. ej. pagos) |
| `BACKEND_URL` | Backend | URL pública propia, usada en webhooks |

Se actualizaron más de 8 componentes del frontend que dependían de `localhost:3000` para usar estas variables en su lugar.

## Problemas encontrados y solución

- **`node_modules` versionado en Git**: causaba errores de permisos en el build de Render. Se agregó a `.gitignore` y se limpió el historial.
- **OneDrive interfiriendo con `.git`**: la sincronización bloqueaba archivos internos de Git. Se excluyó la carpeta del repositorio de la sincronización.
- **CORS mal configurado**: el backend rechazaba peticiones del nuevo dominio público; se ajustó la lista de orígenes permitidos.
- **Variables de entorno faltantes**: el build apuntaba a `localhost` por no estar definidas en el panel de Render; se configuraron explícitamente.
- **Envío de correos bloqueado** en el plan gratuito (restricción de puertos SMTP salientes): se migró el envío de correos a **Resend**, compatible con el plan Free.

## Consideraciones del plan gratuito

- La base de datos PostgreSQL Free tiene **fecha de expiración**; si no se actualiza a un plan pago, la instancia y sus datos se eliminan.
- El backend entra en **reposo (spin down)** tras inactividad, generando demoras de hasta 50+ segundos en la primera solicitud.
- El frontend (sitio estático servido por CDN) no sufre este comportamiento.
- El envío de correo tradicional (SMTP/Nodemailer) no funciona en el plan Free; de ahí el uso de Resend.

---

## Documento original

<a href="/pdf/Preparar_Plataforma_Tecnologica.pdf" target="_blank" rel="noopener noreferrer" style={{display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#C9302C', color: '#fff', padding: '12px 24px', borderRadius: '6px', fontWeight: 'bold', textDecoration: 'none', marginTop: '16px', fontSize: '16px'}}>📄 Descargar Preparar Plataforma Tecnológica (PDF)</a>
