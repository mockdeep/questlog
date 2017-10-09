const INIT = 'common/INIT';
const UPDATE = 'common/UPDATE';

function updateCommon(payload) {
  return {type: UPDATE, payload};
}

export {INIT, UPDATE};
export {updateCommon};
