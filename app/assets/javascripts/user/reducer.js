'use strict';

const StoneObject = require('_common/stone/object');

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

module.exports = function userReducer(previous_state, action) {
  const operation = operations[action.type];

  if (!operation) { throw new Error(`invalid action type: "${action.type}"`); }

  return operation(previous_state, action.payload);
};
