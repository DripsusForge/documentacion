import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', 'f54'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', '596'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', '280'),
            routes: [
              {
                path: '/backend/autenticacion',
                component: ComponentCreator('/backend/autenticacion', '2ff'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/backend/categorias',
                component: ComponentCreator('/backend/categorias', '354'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/backend/descuentos',
                component: ComponentCreator('/backend/descuentos', '88a'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/backend/overview',
                component: ComponentCreator('/backend/overview', '5c4'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/backend/pagos',
                component: ComponentCreator('/backend/pagos', '9d5'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/backend/pedidos',
                component: ComponentCreator('/backend/pedidos', '900'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/backend/productos',
                component: ComponentCreator('/backend/productos', '9a6'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/backend/reservas',
                component: ComponentCreator('/backend/reservas', '6e0'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/backend/usuarios',
                component: ComponentCreator('/backend/usuarios', '821'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/base-datos/',
                component: ComponentCreator('/base-datos/', 'fd3'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/calidad/',
                component: ComponentCreator('/calidad/', '538'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/calidad/documentacion',
                component: ComponentCreator('/calidad/documentacion', '1f8'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/despliegue/',
                component: ComponentCreator('/despliegue/', '755'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/frontend/',
                component: ComponentCreator('/frontend/', 'cb9'),
                exact: true
              },
              {
                path: '/frontend/admin',
                component: ComponentCreator('/frontend/admin', 'f4e'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/frontend/checkout',
                component: ComponentCreator('/frontend/checkout', 'eee'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/frontend/layout',
                component: ComponentCreator('/frontend/layout', '1e8'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/frontend/overview',
                component: ComponentCreator('/frontend/overview', '743'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/frontend/tienda',
                component: ComponentCreator('/frontend/tienda', '0cb'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/frontend/tiendaperfil',
                component: ComponentCreator('/frontend/tiendaperfil', '7d8'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/introduccion/estructura',
                component: ComponentCreator('/introduccion/estructura', 'ae2'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/introduccion/instalacion',
                component: ComponentCreator('/introduccion/instalacion', 'eb7'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/proyecto/dofa',
                component: ComponentCreator('/proyecto/dofa', '9f5'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/proyecto/especificacion-requerimientos',
                component: ComponentCreator('/proyecto/especificacion-requerimientos', '040'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/proyecto/listado-issues',
                component: ComponentCreator('/proyecto/listado-issues', 'e50'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/proyecto/manual-tecnico',
                component: ComponentCreator('/proyecto/manual-tecnico', '888'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/proyecto/manual-usuario',
                component: ComponentCreator('/proyecto/manual-usuario', '3a9'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/proyecto/migracion-datos',
                component: ComponentCreator('/proyecto/migracion-datos', '693'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/proyecto/plataforma-tecnologica',
                component: ComponentCreator('/proyecto/plataforma-tecnologica', '596'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/proyecto/respaldo-datos',
                component: ComponentCreator('/proyecto/respaldo-datos', '43d'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/proyecto/verificacion-hardware',
                component: ComponentCreator('/proyecto/verificacion-hardware', 'f61'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/',
                component: ComponentCreator('/', '03b'),
                exact: true,
                sidebar: "docs"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
