'use strict';

export default function getType(object) {
  const rawType = Object.prototype.toString.call(object);
  const basicType = rawType.match(/^\[object\s(.*)\]$/)[1];

  return basicType;
}
