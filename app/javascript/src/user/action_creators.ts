const INIT = 'user/INIT';
const UPDATE = 'user/UPDATE';

function updateUser(payload: User) {
  return {type: UPDATE, payload};
}

export {INIT, UPDATE};
export {updateUser};
