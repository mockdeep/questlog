import createBasicReducer from 'src/_common/basic_reducer';

const INIT = 'user/INIT';
const UPDATE = 'user/UPDATE';

export default createBasicReducer({
  [INIT]() {
    return {};
  },

  [UPDATE](previousState, payload) {
    return {...previousState, ...payload};
  },
});
