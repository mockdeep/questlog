'use strict';

import StoneObject from './object';
import StoneArray from './array';
import getType from './get_type';

export default function petrify(value) {
  const valueType = getType(value);

  if (value instanceof StoneObject || value instanceof StoneArray) {
    return value;
  } else if (valueType === 'Object') {
    return new StoneObject(value);
  } else if (valueType === 'Array') {
    return new StoneArray(value);
  }

  return value;
}
