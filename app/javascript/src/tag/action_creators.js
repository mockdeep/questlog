const INIT = 'tag/INIT';
const SET = 'tag/SET';
const UPDATE = 'tag/UPDATE';
const UPDATE_META = 'tag/UPDATE_META';

function setTags(payload) {
  return {type: SET, payload};
}

function updateTag(payload) {
  return {type: UPDATE, payload};
}

function updateTagMeta(payload) {
  return {type: UPDATE_META, payload};
}

export {INIT, SET, UPDATE, UPDATE_META};
export {setTags, updateTag, updateTagMeta};
