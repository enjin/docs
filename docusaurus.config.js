// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Enjin Documentation',
  tagline: 'Official Documentation for Enjin',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.enjin.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'enjin', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // Serve the docs at the site's root
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/enjin/docs/tree/master/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      //Search Engine
      algolia: {
        appId: 'D5SPTI7JN9',
        // Public API key: it is safe to commit it
        apiKey: '65206337c8bc339a16dc564f61480400',
        indexName: 'enjin',
        contextualSearch: true,
        searchPagePath: 'search',
        insights: true,
      },
      tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 5,
    },
      image: 'img/social-card.jpg',
      navbar: {
        title: 'Enjin',
        logo: {
          alt: 'Enjin Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
          {to: '/api-reference', label: 'API Reference', position: 'left'},
          {href: 'https://chatgpt.com/g/g-678f70643d2c8191a78baff699e46e5f-enjin-platform-ai', label: 'AI Assistant', position: 'left'},
          {href: 'https://enjin.io/changelog', label: 'Changelog', position: 'left'},
          {href: '/tools', label: 'Tools', position: 'left'},
          
          {
            href: 'https://console.enjin.io',
            label: 'Blockchain Console',
            position: 'right',
          },
          {
            href: 'https://www.enjinstatus.com/',
            label: 'Service Status',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: 'category/getting-started',
              },
              {
                label: 'Guides',
                to: 'category/integration-guides',
              },
              {
                label: 'API Reference',
                to: 'api-reference',
              },
              {
                label: 'Enjin Blockchain',
                to: 'enjin-blockchain/infrustructure',
              },
              {
                label: 'Enjin Platform',
                to: 'enjin-platform',
              },
              {
                label: 'Enjin Products',
                to: 'category/enjin-products',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Telegram',
                href: 'https://enj.in/telegram',
              },
              {
                label: 'Discord',
                href: 'https://enj.in/discord',
              },
              {
                label: 'X',
                href: 'https://enj.in/twitter',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Enjin Support',
                href: 'https://enj.in/support',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/enjin/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Enjin Pte. Ltd.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['csharp', 'http', 'bash', 'php'],
      },
    }),
};

export default config;
