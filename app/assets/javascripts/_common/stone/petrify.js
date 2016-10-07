'use strict';

let StoneObject; // eslint-disable-line prefer-const
let StoneArray; // eslint-disable-line prefer-const
const getType = require('./get_type');

module.exports = function petrify(value) {
  const valueType = getType(value);

  if (value instanceof StoneObject || value instanceof StoneArray) {
    return value;
  } else if (valueType === 'Object') {
    return new StoneObject(value);
  } else if (valueType === 'Array') {
    return new StoneArray(value);
  }

  return value;
};

// avoids circular dependency
StoneObject = require('./object');
StoneArray = require('./array');
