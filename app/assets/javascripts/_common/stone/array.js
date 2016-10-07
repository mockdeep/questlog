'use strict';

const getType = require('./get_type');
let petrify; // eslint-disable-line prefer-const

function StoneArray(source) {
  const sourceType = getType(source);

  if (sourceType !== 'Array' && !(source instanceof StoneArray)) {
    const message = `must be initialized with an array, got ${sourceType}`;

    throw new TypeError(message);
  }

  const array = source.map(function mapValue(value) {
    return petrify(value);
  });

  Object.setPrototypeOf(array, StoneArray.prototype);
  Object.defineProperty(array, 'concat', {value: Array.prototype.concat});
  Object.defineProperty(array, 'push', {value: Array.prototype.push});
  Object.freeze(array);

  return array;
}

module.exports = StoneArray;

// avoids circular dependency
petrify = require('./petrify');
