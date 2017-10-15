'use strict';

var merge = require('webpack-merge');
var common = require('./webpack.common');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
  plugins: [
    new UglifyJSPlugin()
  ]
});