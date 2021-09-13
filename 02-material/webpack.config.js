const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob');

const entryUrls = glob.sync('./src/*/**/index.js');

/**
 * get multiply entry js
 * @param {*} entryUrls 
 * @returns 
 */
function buildEntry (entryUrls) {
  const entries = {}
  if (entryUrls && typeof entryUrls == 'object') {
    entryUrls.forEach(entry => {
      const pageName = entry.split('/')[2].replace(/\.js$/, '')
      entries[pageName] = entry
    })
  }
  return entries
}

/**
 * 
 * @param {*} entryUrls 
 */
function buildHtml (entryUrls) {
  return entryUrls.map(entry => {
    const pageName = entry.split('/')[2]
    return new HtmlWebpackPlugin({
      filename: `${pageName}/index.html`,
      template: entry.replace(/\.js$/, '.html'),
      inject: 'body',
      chunks: [pageName],
      minify: false
    })
  })
}
module.exports = {
  mode: 'production',
  entry: buildEntry(entryUrls),
  output: {
    filename: './[name]/[name].js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    alias: {
      "@root": resolve(__dirname, './diff_vdom'),
      "@src": resolve(__dirname, './src')
    },
    extensions: ['.js', '.less']
  },
  plugins: [
    ...buildHtml(entryUrls)
  ],
  devServer: {
    port: 8080,
    compress: true,
    // open: true,
    // contentBase: "./build"
  }
}