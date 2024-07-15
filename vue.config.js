const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/my-project/'
    : '/',
  configureWebpack: {
    resolve: {
      fallback: {
        util: require.resolve('util/')
      }
    },
    module: {
      rules: [
        {
          test: /pdf\.worker\.entry\.js$/,
          use: { loader: 'file-loader' }
        }
      ]
    }
  }
});