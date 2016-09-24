'use strict';

function StoneError(message) {
  this.name = 'StoneError';
  this.message = message;
}

StoneError.prototype = Error.prototype;

module.exports = StoneError;
