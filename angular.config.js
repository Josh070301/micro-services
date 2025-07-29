const { defineConfig } = require('@angular-devkit/build-angular');
const { mergeConfig } = require('vite');
const viteConfig = require('./vite.config');

module.exports = defineConfig({
  vite: (config) => {
    console.log('Angular is loading Vite config');
    return mergeConfig(config, viteConfig);
  }
});