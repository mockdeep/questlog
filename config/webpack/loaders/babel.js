module.exports = {
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    presets: [
      ['env', {modules: false}],
    ],
  },
};
