const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const SitemapPlugin = require('sitemap-webpack-plugin').default;

// サイトのホスト名とルート
const hostname = 'https://vue-tools.com';
const routes = [
  '/',
  '/text-counter',
  '/word-search',
  '/word-replace',
  '/privacy-policy',
];

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
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
    },
    plugins: [
      new SitemapPlugin({ 
        base: hostname, 
        paths: routes, 
        options: {
          filename: 'sitemap.xml',
          lastmod: true,
          changefreq: 'daily'
        }
      })
    ]
  }
});