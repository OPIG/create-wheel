const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './diff_vdom/index.js',
  output: {
    filename: './[name].js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   loader: [
      //     'css-loader'
      //   ]
      // }
    ]
  },
  resolve: {
    alias: {
      "@root": resolve(__dirname, './diff_vdom')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './diff_vdom/index.html',
      inject: 'body'
    })
  ],
  devServer: {
    port: 8080,
    compress: true,
    open: true,
    // contentBase: "./build"
  }
}