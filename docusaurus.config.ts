import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Moda Mágica',
  tagline: 'Documentación del sistema de e-commerce',
  favicon: 'img/favicon.ico',
  future: { v4: true },
  url: 'https://santialogiraldorodriguez.github.io',
  baseUrl: '/',
  organizationName: 'SantiagoGiraldoRodriguez',
  projectName: 'ModaMagica',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  i18n: { defaultLocale: 'es', locales: ['es'] },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: { respectPrefersColorScheme: true },
    navbar: {
      title: '✦ Moda Mágica',
      logo: { alt: 'Moda Mágica', src: 'img/logo.svg' },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Documentación',
        },
        {
          href: 'https://github.com/SantiagoGiraldoRodriguez/ModaMagica',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `© ${new Date().getFullYear()} Moda Mágica — Documentación del proyecto`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'sql', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
