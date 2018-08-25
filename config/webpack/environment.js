const {environment} = require('@rails/webpacker');

const elm = require('./loaders/elm');
const typescript = require('./loaders/typescript');

environment.loaders.append('elm', elm);
environment.loaders.append('typescript', typescript);

module.exports = environment;
