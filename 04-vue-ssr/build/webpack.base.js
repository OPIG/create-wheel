const {resolve} = require('path')
const VueLoader = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  
  output: {
    filename: "[name].bundle.js",
    path: resolve('./dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env"]
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use : ["vue-style-loader", 'css-loader']
      },
      {
        test: /\.vue$/,
        use: "vue-loader"
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue']
  },
  plugins: [
    new VueLoader()
  ]
}