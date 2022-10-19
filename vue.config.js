const { defineConfig } = require('@vue/cli-service');
// const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
module.exports = defineConfig({
  transpileDependencies: true,
  // chainWebpack: (config) => {
  //   config.plugin('polyfills').use(NodePolyfillPlugin);
  // },
  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  },
  // proxy: 'https://api.rebrandly.com'
});


