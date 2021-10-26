const {merge} = require('webpack-merge')
const base = require('./webpack.base.js')
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(base, {
  entry: {
    server: resolve(__dirname, '../src/server-entry.js')
  },
  target: 'node', // 要给node来使用
  output: {
    libraryTarget: 'commonjs2' // 把最终这个文件的导出结果放到module.exports上
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.ssr.html',
      template: resolve(__dirname, '../public/index.ssr.html'),
      minify: false,
      inject: 'body',
      excludeChunks: ['server'] // 排除某个模块
    })
  ]
})
