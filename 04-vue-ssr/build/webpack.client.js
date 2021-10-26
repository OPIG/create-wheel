const {merge} = require('webpack-merge')
const base = require('./webpack.base.js')
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(base, {
  entry: {
    client: resolve(__dirname, '../src/client-entry.js')
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve(__dirname, '../public/index.html'),
      minify: false,
      inject: 'body'
    })
  ]
})
