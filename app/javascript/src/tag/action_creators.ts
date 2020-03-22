import {Action, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';

import {ajaxPut} from 'src/_helpers/ajax';

const BASE_PATH = '/api/v1/tags';

const INIT = 'tag/INIT';
const SET = 'tag/SET';
const UPDATE = 'tag/UPDATE';
const UPSERT = 'tag/UPSERT';

function setTags(payload: Tag[]) {
  return {type: SET, payload};
}

function updateTagPlain(id: number, payload: AjaxTag) {
  return {type: UPDATE, payload: {id, ...payload}};
}

function updateTag(id: number, payload: AjaxTag) {
  return async function updateTagThunk(dispatch: Dispatch) {
    await ajaxPut(`${BASE_PATH}/${id}`, {tag: payload});

    dispatch(updateTagPlain(id, payload));
  };
}

function upsertTagPlain(payload: AjaxTag) {
  return {type: UPSERT, payload};
}

function upsertTags(tags: AjaxTag[]): ThunkAction<void, State, null, Action> {
  return function upsertTagsThunk(dispatch) {
    tags.forEach(tag => dispatch(upsertTagPlain(tag)));
  };
}

export {INIT, SET, UPDATE, UPSERT};
export {setTags, updateTag, upsertTagPlain, upsertTags};
