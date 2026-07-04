---
id: overview
title: ¿Qué es Moda Mágica?
sidebar_position: 1
slug: /
---

# ✦ Moda Mágica

Sistema de e-commerce completo con panel de administración y tienda pública.

## Stack

| Capa | Tecnología |
|---|---|
| Backend | Node.js + Express |
| Base de datos | PostgreSQL 18 |
| Autenticación | JWT (jsonwebtoken) |
| Contraseñas | bcryptjs |
| Imágenes | Multer |
| Email | Nodemailer + Gmail |
| Frontend | React 18 + Vite |
| Rutas | React Router DOM |
| Íconos | Bootstrap Icons |
| Peticiones HTTP | Axios |

## Módulos

- **Auth** — Login admin, login cliente, registro, verificación por email, recuperación de contraseña
- **Usuarios** — CRUD completo con validaciones
- **Categorías** — CRUD con validación de nombre único
- **Productos** — CRUD con colores, tallas, stock e imágenes
- **Colores** — CRUD para paleta de colores
- **Tallas** — CRUD para tallas del sistema
- **Imágenes** — Subida múltiple, imagen principal, eliminación física
- **Descuentos** — CRUD con prendas aplicables y control de usos
- **Pedidos** — Creación con transacciones, estados, historial

## Repositorio

```
https://github.com/SantiagoGiraldoRodriguez/ModaMagica
```