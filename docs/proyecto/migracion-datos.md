---
id: migracion-datos
title: Plan de Migración de Datos
sidebar_position: 2
---

# Plan de Migración de Datos

**Versión:** V1.0 · **Estado:** Borrador técnico de arquitectura

## Resumen ejecutivo

Diseño técnico para la migración de los esquemas relacionales de ModaMágica hacia la arquitectura en producción (PostgreSQL sobre Render), garantizando continuidad de los módulos core: usuarios, catálogo de productos, carrito de compras y descuentos.

## Objetivos estratégicos

- **Cero pérdida de datos**: integridad referencial absoluta, con especial cuidado en las llaves foráneas entre transacciones e inventario.
- **Downtime mínimo**: ventana de mantenimiento inferior a 1 hora, en horas de bajo tráfico.
- **Seguridad del proceso**: variables de entorno, tokens JWT y contraseñas cifradas permanecen protegidos bajo los estándares de producción.

## Alcance de entidades

| Módulo | Entidades clave | Criticidad |
|---|---|---|
| Gestión de usuarios | Usuarios, roles, permisos, direcciones de envío | Alta — preservar hashes de contraseñas |
| Catálogo de productos | Productos, categorías, variantes, inventario | Media-alta — sincronización con el frontend |
| Módulo de descuentos | Cupones, reglas, historial de aplicación | Crítica — mapeo exacto de vigencias |
| Transacciones y logs | Órdenes, detalle de órdenes, historial de estados, logs | Alta — auditoría financiera |

## Fases de la migración (ETL)

1. **Extracción**: aislamiento del entorno origen y volcado completo del esquema, con pruebas de sanidad sobre los tipos de datos.
2. **Transformación**: verificación de restricciones de unicidad e índices, alineación de tipos de datos con PostgreSQL destino, y ajuste de secuencias (`SERIAL`/`BIGSERIAL`) para evitar colisiones.
3. **Carga**: importación secuencial sobre la instancia cloud, respetando el orden jerárquico de tablas independientes antes que las dependientes por llave foránea.

## Script de inyección

El flujo de carga automatiza la conexión a la base de datos de producción, ejecuta una prueba preliminar, corre el script de migración del esquema (`schema_migracion_modamagica.sql`) y finalmente verifica la existencia de las tablas resultantes.

> ⚠️ **Nota de seguridad:** al igual que en el Plan de Respaldo, el documento original expone la URI de conexión completa con usuario y contraseña de la base de datos de producción en texto plano. Se omite aquí por tratarse de credenciales reales; si este documento se va a publicar ampliamente, conviene rotarlas y referenciarlas solo mediante variables de entorno.

## Plan de contingencia y rollback

Ante degradación de la API, fallas de autenticación JWT o alertas críticas de integridad durante la carga:

1. Terminación inmediata de las conexiones hacia la base de datos cloud temporal.
2. Reenrutamiento del tráfico hacia la base de datos de respaldo previa.
3. Análisis forense de logs locales antes de reintentar la migración.

---

## Documento original

<a href="/pdf/Plan_de_Migracion_de_Datos.pdf" target="_blank" rel="noopener noreferrer" style={{display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#C9302C', color: '#fff', padding: '12px 24px', borderRadius: '6px', fontWeight: 'bold', textDecoration: 'none', marginTop: '16px', fontSize: '16px'}}>📄 Descargar Plan de Migración de Datos (PDF)</a>
