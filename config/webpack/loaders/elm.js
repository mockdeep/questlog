const {resolve} = require('path');

const isProduction = process.env.NODE_ENV === 'production';
const elmSource = resolve(process.cwd());
const elmMake = `${elmSource}/node_modules/.bin/elm-make`;

const elmDefaultOptions = {cwd: elmSource, pathToMake: elmMake};
const developmentOptions = {...elmDefaultOptions,
  verbose: true,
  warn: true,
  debug: true};

const elmWebpackLoader = {
  loader: 'elm-webpack-loader',
  options: isProduction ? elmDefaultOptions : developmentOptions,
};

let loaders;

if (isProduction) {
  loaders = [elmWebpackLoader];
} else {
  loaders = [{loader: 'elm-hot-loader'}, elmWebpackLoader];
}

module.exports = {
  test: /\.elm$/u,
  exclude: [/elm-stuff/u, /node_modules/u],
  use: loaders,
};
