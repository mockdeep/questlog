const webpack = require('webpack');
const merge = require('webpack-merge');

const sharedConfig = require('./shared.js');

module.exports = merge(sharedConfig.config, {
  devtool: 'sourcemap',

  stats: {errorDetails: true},

  output: {pathinfo: true},

  plugins: [
    new webpack.LoaderOptionsPlugin({debug: true}),
  ],
});
