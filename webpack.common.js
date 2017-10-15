'use strict';

var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/client/app.jsx",
  output: {
    filename: "bundle.js",
    sourceMapFilename: "bundle.map",
    path: __dirname + '/public'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        cacheDirectory: true,
        presets: ['env', 'react']
      }
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['public/*.*']),

    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: './src/client/index.html',
      inject: 'body'
    }),

    // https://github.com/kevlened/copy-webpack-plugin
    new CopyWebpackPlugin([{
      from: './src/client/assets/js/*.js',
      to: 'assets/js/[name].js'
    }]),
    new CopyWebpackPlugin([{
      from: './src/client/assets/css/*.css',
      to: 'assets/css/[name].css'
    }]),
    new CopyWebpackPlugin([{
      from: './src/client/images/*.*',
      to: 'images/[name].[ext]'
    }])
  ]
};