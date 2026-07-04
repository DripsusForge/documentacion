---
id: manual-tecnico
title: Manual Técnico
sidebar_position: 8
---

# Manual Técnico Avanzado de Ingeniería de Software

**Versión del sistema:** v1.5.0-Prod · **Fecha de emisión:** 2 de julio de 2026 · **Ubicación:** Medellín, Antioquia, Colombia

## Resumen ejecutivo

Especificación técnica de arquitectura e implementación funcional de ModaMágica: stack tecnológico, restricciones críticas del servidor y matriz detallada de requerimientos funcionales del panel de administración, órdenes, descuentos y módulo público orientado al cliente.

> **Nota:** este documento describe el frontend sobre React/Next.js con SCSS. Si tu implementación actual usa React + Vite (como en la documentación de despliegue), verifica cuál stack corresponde a la versión vigente del proyecto antes de usar este manual como referencia técnica definitiva.

## Arquitectura del sistema

- **Frontend:** React sobre Next.js (Server Components, App Router, renderizado híbrido), con SCSS para el sistema de diseño.
- **Backend:** Node.js con Express, API RESTful con middlewares de autenticación, validación de payloads, manejo de excepciones y rate limiting.
- **Base de datos:** PostgreSQL, con integridad referencial forzada mediante llaves primarias, compuestas y foráneas, y migraciones secuenciales de esquema.

## Restricciones técnicas críticas

- **Carga de multimedia:** solo `.jpg`, `.png` y `.webp`; el backend (Multer) rechaza archivos mayores a 5 MB con un error HTTP 413.
- **Búsquedas insensibles a mayúsculas:** todo filtrado y búsqueda de catálogo usa `ILIKE` o `LOWER()` en PostgreSQL para ignorar mayúsculas, minúsculas y tildes.

## Panel de administración — usuarios y seguridad

Autenticación con JWT y bcrypt, restablecimiento de contraseña con código de verificación (15 minutos de vigencia), cierre de sesión con invalidación de token, creación/edición/eliminación de colaboradores con control de roles y **soft delete** (no se permite auto-eliminación).

## Catálogo de inventario

Modificación e inserción de productos con validaciones estrictas de nombre, precio (> 0) y descripción (máx. 500 caracteres); fichas de producto con variantes por color y talla; listado con filtros y ordenamiento dinámico.

## Gestión de categorías

Creación, listado, modificación y eliminación de categorías, con validación de unicidad de nombre y sanitización contra XSS. La eliminación está bloqueada por integridad referencial si existen productos asociados. **Regla documentada:** el modal de edición de categorías se limita a nombre, descripción y estado — no incluye carga de imágenes.

## Pedidos y descuentos

- Listado, detalle y facturación en PDF de pedidos; edición de estados solo permitida en estados iniciales ("Pendiente", "En preparación"); bloqueo total de modificación una vez "Enviado", "Entregado" o "Completado".
- Cupones de descuento con porcentaje entre 1% y 90% (hasta 100% en cupones de fidelización), fechas con formato `DD/MM/AAAA`, cambio automático a "Vencido" al vencer, código de cupón inmutable tras su creación, y eliminación en cascada que restaura el precio base de los productos afectados.

## Módulo orientado al cliente

Catálogo con carga perezosa de imágenes, menú de categorías que solo muestra categorías activas con stock disponible, ficha de producto con selección de color/talla en tiempo real, búsqueda predictiva con debounce de 300ms, enlaces externos con `target="_blank"` y `rel="noopener noreferrer"`, carrito persistente (Context/LocalStorage) con agrupación de ítems idénticos, y desglose de compra con IVA del 19%.

---

## Documento original

<a href="/pdf/Manual_Tecnico_ModaMagica.pdf" target="_blank" rel="noopener noreferrer" style={{display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#37474F', color: '#fff', padding: '12px 24px', borderRadius: '6px', fontWeight: 'bold', textDecoration: 'none', marginTop: '16px', fontSize: '16px'}}>📄 Descargar Manual Técnico (PDF)</a>
