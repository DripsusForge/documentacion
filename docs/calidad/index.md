---
id: index
title: Calidad y Pruebas
sidebar_position: 1
---

# Informe de Calidad y Pruebas

Suite de Pruebas de Integración — API REST ModaMágica  
**Backend:** Node.js / Express / PostgreSQL · **Framework:** Jest + Supertest

---

## Resumen de resultados

| Métrica | Valor |
|---|---|
| Módulos analizados | 8 |
| Casos de prueba | 251 |
| Endpoints CRUD con prueba | 100% |
| Módulos con pruebas transaccionales | 2 (Pedidos y Productos) |
| Fecha del informe | 29 de junio de 2026 |

---

## Distribución por módulo

| Módulo | Archivo | Total | Validación (400) | Éxito | 404 | 500 | Trans./Rama |
|---|---|---|---|---|---|---|---|
| Categorías | `categorias.test.js` | 21 | 8 | 5 | 3 | 5 | 0 |
| Descuentos | `descuento.test.js` | 38 | 19 | 9 | 3 | 5 | 2 |
| Pedidos | `pedidos.test.js` | 49 | 14 | 18 | 4 | 10 | 3 |
| Colores | `colores.test.js` | 15 | 3 | 6 | 2 | 4 | 0 |
| Imágenes | `imagenes.test.js` | 14 | 2 | 6 | 2 | 4 | 0 |
| Productos | `productos.test.js` | 38 | 11 | 10 | 3 | 4 | 10 |
| Tallas | `tallas.test.js` | 13 | 3 | 4 | 2 | 4 | 0 |
| Usuarios | `usuarios.test.js` | 63 | 41 | 10 | 4 | 5 | 3 |
| **TOTAL** | | **251** | **101** | **68** | **23** | **41** | **18** |

---

## Metodología

- **Framework:** Jest con `describe/test` anidados por endpoint y caso de uso.
- **Cliente HTTP:** Supertest sobre instancias de Express montadas en memoria.
- **Aislamiento de base de datos:** `jest.mock('../../config/db')` sustituye el pool de conexión (`pg.Pool`), controlando de forma determinista las filas devueltas y forzando errores con `mockRejectedValueOnce`.
- **Aislamiento entre pruebas:** `beforeEach(() => jest.clearAllMocks())` garantiza independencia total.
- **Transacciones:** En Pedidos y Productos se simula un cliente con `query()` y `release()` encadenados, reproduciendo secuencias `BEGIN → … → COMMIT/ROLLBACK`.

---

## Fortalezas identificadas

- Cobertura sistemática del patrón CRUD completo en los 8 módulos.
- Pruebas explícitas para todos los códigos HTTP relevantes: `200/201`, `400`, `404` y `500`.
- Validaciones de campo exhaustivas en Usuarios y Descuentos (formato, longitud, regex, reglas de fecha/edad).
- Pruebas de `ROLLBACK` y liberación del cliente de conexión en Pedidos y Productos, mitigando fugas de conexiones.
- Prueba unitaria directa de la función `validar()` de Descuentos (sin pasar por HTTP).
- Pruebas de robustez frente a dependencias externas en Imágenes (mock de `fs` y `multer`).

---

## Riesgos y áreas de mejora

- **Sin pruebas end-to-end:** toda la suite simula la base de datos; errores de esquema SQL no serán detectados.
- **Sin pruebas de autenticación/autorización:** no se ejercita control de acceso por rol, JWT ni sesiones.
- **Sin pruebas de concurrencia:** no hay casos de dos solicitudes simultáneas sobre el mismo stock de inventario.
- **Cobertura desigual entre módulos:** Tallas e Imágenes (13–14 pruebas) vs. Usuarios (63 pruebas).
- **Sin pruebas de payloads malformados:** tipos de datos incorrectos en el cuerpo JSON, límites de tamaño.

---

## Recomendaciones

1. Ejecutar `jest --coverage` e incorporar un umbral mínimo (85% líneas / 80% ramas) como *quality gate* en CI.
2. Añadir pruebas end-to-end con PostgreSQL en contenedor Docker efímero que ejecute las migraciones reales.
3. Añadir pruebas de seguridad: control de acceso por rol, expiración de sesión/token y hashing de contraseñas.
4. Sumar pruebas de concurrencia para el descuento de inventario en Pedidos.
5. Estandarizar la supresión de `console.error` durante las pruebas en todos los módulos.
6. Evaluar migración de validaciones repetidas hacia un esquema declarativo como **Joi** o **Zod**.

---

| Módulo | Cobertura | Estado |
|---|---|---|
| Visualización de productos | 100% | ✅ Completo |
| Carrito de compras | 90% | ✅ Completo |
| Pedidos (vista 1) | 85% | ✅ Completo |
| Pedidos (vista 2) | 83% | ✅ Completo |
| Autenticación | 66% | ⚠️ En progreso |
| Categoría | 60% | ⚠️ En progreso |
| Descuento | 60% | ⚠️ En progreso |
| Usuarios admin | 0% | ❌ Pendiente |
| Usuarios | 0% | ❌ Pendiente |

---

## Informe completo en PDF

El documento oficial con todos los gráficos y el análisis detallado está disponible para descarga:

<a href="/pdf/Informe_Calidad_Pruebas_ModaMagica.pdf" target="_blank" rel="noopener noreferrer" style={{display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#e91e8c', color: '#fff', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', textDecoration: 'none', marginTop: '12px'}}>📄 Descargar informe PDF</a>