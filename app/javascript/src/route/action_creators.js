const INIT = 'route/INIT';
const SET = 'route/SET';

function setRoute(payload) {
  return {type: SET, payload};
}

export {INIT, SET};
export {setRoute};
