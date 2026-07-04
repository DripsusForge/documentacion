---
id: layout
title: Layout y componentes base
sidebar_position: 2
---

# Layout y componentes base

## Layout (`components/Layout.jsx`)

Envuelve todas las páginas del panel admin. Incluye:

### Navbar
- Logo `✦ Moda Mágica ✦` con gradiente dorado
- Botón para colapsar/expandir el sidebar
- Toggle dark/light mode
- Menú de perfil con dropdown: enlace a Mi Perfil y cerrar sesión

### Sidebar
Colapsable: 230px (expandido) ↔ 68px (colapsado). El menú se filtra por rol:

| Sección | Roles que la ven |
|---|---|
| Tablero | superadmin, admin |
| Gestión de Usuarios | superadmin |
| Inventario (Categorías + Productos) | superadmin, admin |
| Pedidos | superadmin |
| Descuentos | superadmin |

### Footer
Sincronizado con el estado del sidebar (margin-left igual).

---

## ConfirmModal (`components/ConfirmModal.jsx`)

Modal de confirmación reutilizable en todos los módulos:

```jsx
<ConfirmModal
  show={confirm.show}
  titulo="¿Eliminar categoría?"
  mensaje="Esta acción no se puede deshacer."
  error={deleteError}
  onCancel={() => setConfirm({ show: false, id: null })}
  onConfirm={() => eliminar(confirm.id)}
/>
```

| Prop | Descripción |
|---|---|
| `show` | Booleano para mostrar/ocultar |
| `titulo` | Título del modal |
| `mensaje` | Mensaje de confirmación |
| `error` | Si tiene valor, muestra el error en lugar del botón de confirmar |
| `onCancel` | Función al cancelar |
| `onConfirm` | Función al confirmar (no se muestra si hay `error`) |
