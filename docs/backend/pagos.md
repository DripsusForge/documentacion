---
id: pagos
title: Pagos (Mercado Pago)
sidebar_position: 8
---

# Pagos — Mercado Pago Checkout Pro

Archivo: `controllers/Pagos/pagos.controller.js`  
Rutas: `routes/Pagos/pagos.routes.js`

## Endpoints

```http
POST /api/pagos/crear-preferencia
POST /api/pagos/webhook
```

## Crear preferencia

```http
POST /api/pagos/crear-preferencia
```

```json
{ "id_pedido": 15 }
```

Consulta el pedido y sus detalles, construye los `items` para Mercado Pago:
- Si hay descuento aplicado, agrupa todo en un solo ítem con `unit_price = total_final`.
- Si no hay descuento, mapea cada producto del detalle como ítem individual.

Configura las `back_urls` usando `process.env.FRONTEND_URL`:
- `success` → `/tienda/pago-resultado?estado=success`
- `failure` → `/tienda/pago-resultado?estado=failure`
- `pending` → `/tienda/pago-resultado?estado=pending`

La `notification_url` apunta a `/api/pagos/webhook` en `process.env.BACKEND_URL`.

Guarda el `preference_id` generado en la columna `preference_id` del pedido.

**Respuesta:**
```json
{
  "preference_id": "1234567890-abc...",
  "init_point": "https://www.mercadopago.com.co/checkout/v1/redirect?pref_id=..."
}
```

## Webhook

```http
POST /api/pagos/webhook
```

Recibe notificaciones de Mercado Pago. Solo procesa eventos de `type = 'payment'`.

Para cada pago aprobado:
1. Consulta el pago vía SDK de Mercado Pago
2. Actualiza en `pedido`: `estado_pago`, `metodo_pago`, `referencia_pago`, `estado_pedido`
3. Si el pago fue `approved`, envía email de confirmación al cliente vía Resend

| Estado MP | `estado_pago` en DB | `estado_pedido` en DB |
|---|---|---|
| `approved` | `pagado` | `procesando` |
| `pending` | `pendiente` | `pendiente` |
| otros | `rechazado` | `pendiente` |

### Email de confirmación

Enviado vía `utils/correo.js` (Resend HTTP API) con tabla HTML de los productos comprados (nombre, color, talla, cantidad, precio).

:::caution Limitación Resend free tier
En el plan gratuito, los correos solo se pueden enviar al correo registrado en la cuenta de Resend hasta que se verifique un dominio personalizado.
:::

## Variables de entorno requeridas

| Variable | Descripción |
|---|---|
| `MP_ACCESS_TOKEN` | Access token de Mercado Pago (producción o sandbox) |
| `FRONTEND_URL` | URL del frontend (para las back_urls) |
| `BACKEND_URL` | URL del backend (para la notification_url del webhook) |
| `EMAIL_USER` | Correo registrado en Resend (destinatario hasta verificar dominio) |
