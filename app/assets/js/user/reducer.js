'use strict';

import StoneObject from 'js/_common/stone/object';
import createBasicReducer from 'js/_common/basic_reducer';

function initUser() {
  return new StoneObject({});
}

function updateUser(previousState, payload) {
  return new StoneObject(Object.assign({}, previousState, payload));
  // empty
}

const operations = {
  'user/INIT': initUser,
  'user/UPDATE': updateUser
};

export default createBasicReducer(operations);
