---
id: checkout
title: Checkout
sidebar_position: 5
---

# Checkout

Archivo: `pages/checkout/Checkout.jsx`, `Checkout.css`

Ruta: `/tienda/checkout`

## Flujo general

1. Carga el carrito desde `localStorage` (`mm_carrito`)
2. Verifica sesión en `sessionStorage` (`tiendaSesion`); si no hay sesión, redirige a `/tienda?login=1`
3. Muestra resumen del carrito con cantidades editables
4. Permite aplicar un código de descuento
5. Al confirmar, crea el pedido y luego redirige a Mercado Pago

## Aplicar descuento

- Campo de texto + botón "Aplicar"
- Llama a `GET /api/pedidos/descuento/:codigo`
- Verifica que al menos uno de los productos del carrito esté en `prendas_ids` del descuento
- Si aplica, calcula `montoDescuento = subtotal * (valor_descuento / 100)` y muestra el total final

## Confirmar compra

Al hacer clic en "Confirmar y pagar":

1. `POST /api/pedidos` — crea el pedido con los ítems del carrito
2. `POST /api/pagos/crear-preferencia` con el `id_pedido` devuelto
3. `DELETE /api/reservas/sesion` — libera las reservas de stock (el stock real ya se descontó)
4. Limpia `mm_carrito` de `localStorage`
5. Redirige al `init_point` de Mercado Pago Checkout Pro (abre en la misma pestaña)

## Validación de dirección

Antes de permitir la confirmación, verifica que `sesion.direccion` no esté vacía. Si el cliente no tiene dirección guardada, muestra un modal (`modalDatos`) para que la ingrese antes de continuar.

## Resumen de precios

| Concepto | Cálculo |
|---|---|
| Subtotal | Suma de `precio × cantidad` por ítem |
| Descuento | `subtotal × (valor_descuento / 100)` |
| Total | `subtotal - montoDescuento` |

---

# Resultado de Pago

Archivo: `pages/PagoResultado/pagoResultado.jsx`

Ruta: `/tienda/pago-resultado`

Mercado Pago redirige aquí con `?estado=success|failure|pending`.

| Estado | Ícono | Mensaje |
|---|---|---|
| `success` | ✅ verde | "¡Pago exitoso! Tu pedido fue confirmado." |
| `pending` | ⏳ amarillo | "Pago en proceso. Te avisaremos cuando se confirme." |
| `failure` | ❌ rojo | "Pago rechazado. Intenta de nuevo." |

Si el estado es `success`, elimina `mm_carrito` de `localStorage`.

Botón "Volver a la tienda" → navega a `/tienda`.
