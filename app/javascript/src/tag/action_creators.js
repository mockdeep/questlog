const INIT = 'tag/INIT';
const SET = 'tag/SET';
const UPDATE = 'tag/UPDATE';

function setTags(payload) {
  return {type: SET, payload};
}

function updateTag(payload) {
  return {type: UPDATE, payload};
}

export {INIT, SET, UPDATE};
export {setTags, updateTag};
