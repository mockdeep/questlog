const INIT = 'common/INIT';
const UPDATE = 'common/UPDATE';

type Payload = {
  openModalId: number;
};

function updateCommon(payload: Payload) {
  return {type: UPDATE, payload};
}

export {INIT, UPDATE};
export {updateCommon};
