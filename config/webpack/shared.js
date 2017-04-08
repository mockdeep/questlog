const webpack = require('webpack');
const path = require('path');
const process = require('process');
const glob = require('glob');
const extname = require('path-complete-extname');

const distDir = process.env.WEBPACK_DIST_DIR || 'packs';

const config = {
  entry: glob.sync(path.join('app', 'js', 'packs', '*.js*')).reduce(
    (map, entry) => {
      const basename = path.basename(entry, extname(entry));
      const localMap = map;

      localMap[basename] = path.resolve(entry);

      return localMap;
    }, {}
  ),

  output: {filename: '[name].js', path: path.resolve('public', distDir)},

  module: {
    rules: [
      {
        test: /\.js(\.erb)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', {modules: false}],
          ],
        },
      },
      {
        test: /\.erb$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'rails-erb-loader',
        options: {runner: 'DISABLE_SPRING=1 bin/rails runner'},
      },
    ],
  },

  plugins: [
    new webpack.EnvironmentPlugin(Object.keys(process.env)),
  ],

  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve('app'),
      path.resolve('node_modules'),
    ],
  },

  resolveLoader: {modules: [path.resolve('node_modules')]},
};

module.exports = {
  distDir,
  config,
};
