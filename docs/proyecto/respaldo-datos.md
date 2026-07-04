---
id: respaldo-datos
title: Plan de Respaldo de Datos
sidebar_position: 1
---

# Plan de Respaldo de Datos (Backup Plan)

**Versión:** v1.1 · **Entorno de BD:** Render PostgreSQL (Producción) · **Clasificación:** Confidencial / Técnico

## Resumen ejecutivo

Define la estrategia de copias de seguridad y recuperación ante desastres de ModaMágica, con el objetivo de poder restablecer íntegramente los datos transaccionales, de productos y de usuarios ante una falla del proveedor de infraestructura (Render), minimizando el impacto financiero y operativo de la tienda.

## Activos protegidos

- **Base de datos relacional** (Render PostgreSQL): usuarios, productos, carrito, logs y módulo de descuentos.
- **Variables de entorno** del backend: llaves JWT, tokens de API, credenciales SMTP y acceso a la BD.
- **Multimedia**: imágenes del catálogo y banners de la tienda.

## Objetivos de recuperación

| Métrica | Valor | Significado |
|---|---|---|
| RPO (Recovery Point Objective) | 24 horas | Pérdida máxima aceptable de datos; respaldo automático cada medianoche |
| RTO (Recovery Time Objective) | 2 horas | Tiempo límite para restablecer frontend + backend + BD ante un incidente |

## Estrategia 3-2-1

1. **3 copias**: datos vivos en Render, respaldo lógico local y una copia externa.
2. **2 medios distintos**: almacenamiento en caliente en producción y archivos comprimidos (`.sql.gz`) en almacenamiento secundario.
3. **1 ubicación fuera de sitio**: réplica fuera del ecosistema de Render.

## Automatización del respaldo

El respaldo diario se automatiza con `pg_dump` mediante un script de Bash ejecutado por `cron`. El script genera un volcado comprimido con marca de tiempo, valida que la operación haya finalizado correctamente y aplica una política de depuración local que conserva solo los últimos 7 días.

> ⚠️ **Nota de seguridad:** el documento original incluye la cadena de conexión completa a la base de datos (usuario y contraseña en texto plano) dentro del script de respaldo. Por tratarse de credenciales reales de producción, se omiten aquí; consulta el PDF original únicamente en un entorno controlado y considera rotar esas credenciales si el documento llega a circular ampliamente.

## Política de retención

- **Diarios**: 7 días.
- **Semanales** (cada domingo): 4 semanas.
- **Mensuales** (primer respaldo del mes): 12 meses, para auditoría y reportes históricos.

## Plan de restauración (DRP)

1. Descompresión del archivo `.sql.gz` seleccionado.
2. Re-inyección del volcado en la instancia de destino mediante `psql`.
3. Simulacros de restauración obligatorios el primer sábado de cada trimestre, en un entorno local aislado, validando que el RTO se cumpla en menos de 2 horas.

## Validación de integridad

Se documentó una verificación cuantitativa de tablas clave (productos, usuarios) ejecutada desde pgAdmin como evidencia del protocolo post-migración y auditoría de respaldos.

---

## Documento original

<a href="/pdf/Plan_de_Respaldo_ModaMagica_V2.pdf" target="_blank" rel="noopener noreferrer" style={{display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#C9302C', color: '#fff', padding: '12px 24px', borderRadius: '6px', fontWeight: 'bold', textDecoration: 'none', marginTop: '16px', fontSize: '16px'}}>📄 Descargar Plan de Respaldo (PDF)</a>
