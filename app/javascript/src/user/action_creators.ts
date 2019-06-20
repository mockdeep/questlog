const INIT = 'user/INIT';
const SET = 'user/SET';
const UPDATE = 'user/UPDATE';

function updateUser(payload: User) {
  return {type: UPDATE, payload};
}

export {INIT, SET, UPDATE};
export {updateUser};
