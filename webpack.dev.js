'use strict';

var merge = require('webpack-merge');
var common = require('./webpack.common');

module.exports = merge(common, {
  devtool: '#source-map',
  devServer: {
    contentBase: './public'
  }
});