'use strict';

import createBasicReducer from 'js/_common/basic_reducer';

function initUser() {
  return {};
}

function updateUser(previousState, payload) {
  return Object.assign({}, previousState, payload);
}

const operations = {
  'user/INIT': initUser,
  'user/UPDATE': updateUser,
};

export default createBasicReducer(operations);
