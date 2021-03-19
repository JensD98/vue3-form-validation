/** @typedef {import('vitepress').UserConfig} UserConfig */

/** @type {UserConfig} */
const config = {
  title: 'Vue 3 Form Validation',
  description: 'Composition Function for Form Validation',
  themeConfig: {
    nav: [
      {
        text: 'Guide',
        link: '/guide'
      },
      {
        text: 'API Reference',
        link: '/api'
      }
    ]
  }
};

module.exports = config;
