import createBasicReducer from 'src/_common/basic_reducer';

function initUser() {
  return {};
}

function updateUser(previousState, payload) {
  return {...previousState, ...payload};
}

const operations = {
  'user/INIT': initUser,
  'user/UPDATE': updateUser,
};

export default createBasicReducer(operations);
