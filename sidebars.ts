import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    {
      type: 'category',
      label: '🏠 Introducción',
      collapsed: false,
      items: ['introduccion/overview', 'introduccion/instalacion', 'introduccion/estructura'],
    },
    {
      type: 'category',
      label: '⚙️ Backend',
      items: [
        'backend/overview',
        'backend/autenticacion',
        'backend/usuarios',
        'backend/categorias',
        'backend/productos',
        'backend/descuentos',
        'backend/pedidos',
        'backend/reservas',
        'backend/pagos',
      ],
    },
    {
      type: 'category',
      label: '🖥️ Frontend',
      items: [
        'frontend/overview',
        'frontend/layout',
        'frontend/admin',
        'frontend/tienda',
        'frontend/tiendaperfil',
        'frontend/checkout',
      ],
    },
    {
      type: 'category',
      label: '🗄️ Base de datos',
      items: ['base-datos/index'],
    },
    {
      type: 'category',
      label: '🚀 Despliegue',
      items: ['despliegue/index'],
    },
    {
      type: 'category',
      label: '🧪 Calidad y Pruebas',
      items: ['calidad/index', 'calidad/documentacion'],
    },
    {
      type: 'category',
      label: '📋 Documentación de Proyecto',
      items: [
        'proyecto/respaldo-datos',
        'proyecto/migracion-datos',
        'proyecto/plataforma-tecnologica',
        'proyecto/verificacion-hardware',
        'proyecto/listado-issues',
        'proyecto/especificacion-requerimientos',
        'proyecto/dofa',
        'proyecto/manual-tecnico',
        'proyecto/manual-usuario',
      ],
    },
  ],
};

export default sidebars;
