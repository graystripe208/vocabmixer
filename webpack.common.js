'use strict';

var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ["./src/client/app.jsx", './src/client/assets/sass/main.scss'],
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
      }, {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['./public/**/*.*']),

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
      from: './src/client/images/*.*',
      to: 'images/[name].[ext]'
    }]),

    new ExtractTextPlugin({
      filename: 'bundle.css',
      allChunks: true,
    })
  ]
};
