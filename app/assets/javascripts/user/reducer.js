'use strict';

import StoneObject from '_common/stone/object';
import createBasicReducer from '_common/basic_reducer';

function initUser() {
  return new StoneObject({});
}

function updateUser(previous_state, payload) {
  return new StoneObject(Object.assign({}, previous_state, payload));
  // empty
}

const operations = {
  'user/INIT': initUser,
  'user/UPDATE': updateUser
};

export default createBasicReducer(operations);
