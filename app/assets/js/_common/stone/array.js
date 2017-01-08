'use strict';

import getType from './get_type';
import petrify from './petrify';

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

export default StoneArray;
