---
id: manual-usuario
title: Manual de Usuario
sidebar_position: 9
---

# Manual de Usuario Integral

**Versión:** v1.0 · **Fecha de emisión:** julio de 2026 · **Dirigido a:** Administradores y Superadmin

## Resumen ejecutivo

Guía de operación administrativa del sistema ModaMágica, orientada a los roles de Administrador y Superadmin, para el uso correcto del panel de control: inventario, usuarios, pedidos y descuentos.

## Acceso al sistema administrativo

Inicio de sesión con correo y contraseña en el formulario seguro del panel. El sistema bloquea la cuenta tras un número máximo de intentos fallidos, y ofrece recuperación de contraseña mediante un enlace con vigencia de 15 minutos.

## Gestión de usuarios

Permite buscar y filtrar por nombre, correo, rol (Cliente, Admin, Superadmin) o estado; crear nuevos colaboradores con contraseña temporal; modificar nombre, correo o rol (el identificador único no es editable); y eliminar de forma lógica (soft delete), cambiando el estado a "Inactivo" sin borrar el historial. Toda creación o modificación queda registrada en la bitácora de auditoría.

## Gestión de categorías

Estructura los menús principales de la tienda. Nombre y descripción son obligatorios y el nombre debe ser único. El modal de edición no incluye carga de imágenes — solo texto y estado. Al desactivar una categoría, el sistema alerta sobre los productos que se ocultarán; no se permite eliminar categorías con productos asociados.

## Catálogo de productos

Administra existencias, variantes y precios. El nombre debe ser único, solo letras y espacios; el precio debe ser positivo; la descripción tiene un máximo de 500 caracteres; se admiten hasta 10 imágenes por producto (JPG, PNG o WEBP, máx. 5 MB cada una); el stock se gestiona por combinación de color y talla; y la eliminación es lógica (el producto pasa a "Inactivo").

## Gestión de pedidos

El panel resume el volumen de órdenes en cuatro categorías: Total, Pendientes, En tránsito y Entregados. Los estados deben avanzar en un flujo lógico estricto, y desde el detalle del pedido se puede descargar la factura en PDF y registrar la guía de envío. **Solo se pueden modificar o eliminar pedidos en estado "Pendiente" o "En preparación"**; una vez "Enviado" o "Completado", quedan bloqueados.

## Promociones y descuentos

Cada cupón se configura con un código único e invariable, un porcentaje de descuento entre 1% y 100%, un límite de usos (una vez por cliente), fechas de vigencia obligatorias (con cambio automático a "Vencido" al cumplirse la fecha de cierre) y restricciones opcionales por producto específico.

## Material complementario

El manual original hace referencia a un videotutorial oficial de operación (inicio de sesión, creación de productos con variantes, aplicación de cupones y procesamiento de una compra), disponible como enlace dentro del documento PDF.

---

## Documento original

<a href="/pdf/Manual_de_Usuario_ModaMagica.pdf" target="_blank" rel="noopener noreferrer" style={{display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#AD1457', color: '#fff', padding: '12px 24px', borderRadius: '6px', fontWeight: 'bold', textDecoration: 'none', marginTop: '16px', fontSize: '16px'}}>📄 Descargar Manual de Usuario (PDF)</a>
