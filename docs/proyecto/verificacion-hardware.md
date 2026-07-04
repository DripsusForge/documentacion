---
id: verificacion-hardware
title: Verificación de Hardware
sidebar_position: 4
---

# Verificación de Hardware

**Programa:** Análisis y Desarrollo de Software — SENA · **Ficha:** 3065123

## Resumen ejecutivo

Verifica que el hardware disponible para desarrollo, despliegue (servidor) y acceso del usuario final cumpla con las características mínimas necesarias para el correcto funcionamiento de ModaMágica. El alcance cubre únicamente entornos de escritorio (no incluye dispositivos móviles).

## Pila tecnológica evaluada

Backend en Node.js/Express con API REST, base de datos PostgreSQL, frontend en React 18 + Vite, autenticación con JWT y bcrypt, carga de imágenes con Multer, pagos con Mercado Pago, notificaciones con Nodemailer, y pruebas con Jest/Supertest.

## Requisitos mínimos por entorno

| Entorno | Procesador | RAM | Almacenamiento | Software base |
|---|---|---|---|---|
| Desarrollo | i3/Ryzen 3 (4 núcleos) | 8 GB | 10 GB libres | Node 18 LTS, PostgreSQL 14, Git |
| Servidor | 1 vCPU | 2 GB | 20 GB SSD | Linux Ubuntu 20.04+, Node 18, PostgreSQL 14 |
| Cliente (navegador) | Dual-core 1.6 GHz | 4 GB | 1 GB libre | Navegador actualizado con JavaScript |

## Compatibilidad de navegadores

Compatible con Chrome, Firefox, Edge, Safari y Opera en sus últimas versiones (mínimo versión 100 para los basados en Blink/Gecko, 15 para Safari). Requiere JavaScript ES2020+, Fetch API, cookies/almacenamiento local para la sesión JWT, y soporte de CSS Grid/Flexbox.

## Resoluciones soportadas

Desde 1280×720 (mínimo soportado, portátiles de 13"–14") hasta 4K (3840×2160) con escalado de interfaz; la resolución recomendada/óptima es 1920×1080 (Full HD).

## Resultado de la verificación

El hardware disponible en los tres entornos evaluados **cumple** con todas las características mínimas requeridas. No se identificaron incumplimientos que impidan la ejecución, el despliegue o el acceso a la plataforma.

## Recomendaciones

- Monitorear el consumo de recursos del servidor a medida que crezcan el catálogo, las imágenes y los usuarios concurrentes, escalando de 2 GB a 4–8 GB de RAM si es necesario.
- Mantener PostgreSQL y Node.js en versiones LTS soportadas.
- Realizar copias de seguridad periódicas de la base de datos y de las imágenes de productos.
- Si se contempla una versión móvil, elaborar un documento de verificación de hardware específico para ese alcance.

---

## Documento original

<a href="/pdf/Verificacion_Hardware_ModaMagica.pdf" target="_blank" rel="noopener noreferrer" style={{display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#C9302C', color: '#fff', padding: '12px 24px', borderRadius: '6px', fontWeight: 'bold', textDecoration: 'none', marginTop: '16px', fontSize: '16px'}}>📄 Descargar Verificación de Hardware (PDF)</a>
