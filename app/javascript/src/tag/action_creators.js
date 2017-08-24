import {ajaxPut} from 'src/_helpers/ajax';

const BASE_PATH = '/api/v1/tags';

const INIT = 'tag/INIT';
const SET = 'tag/SET';
const UPDATE = 'tag/UPDATE';
const UPDATE_META = 'tag/UPDATE_META';

function setTags(payload) {
  return {type: SET, payload};
}

function updateTagClient(id, payload) {
  return {type: UPDATE, payload: {id, ...payload}};
}

function updateTag(id, payload) {
  return (dispatch) => ajaxPut(`${BASE_PATH}/${id}`, {tag: payload}).
    then(() => dispatch(updateTagClient(id, payload)));
}

function updateTagMeta(payload) {
  return {type: UPDATE_META, payload};
}

export {INIT, SET, UPDATE, UPDATE_META};
export {setTags, updateTag, updateTagMeta};
