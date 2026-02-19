import type {Action} from "redux";
import type {ThunkAction} from "redux-thunk";

const INIT = "tag/INIT";
const SET = "tag/SET";
const UPSERT = "tag/UPSERT";

function setTags(payload: Tag[]) {
  return {type: SET, payload};
}

function upsertTagPlain(payload: AjaxTag) {
  return {type: UPSERT, payload};
}

function upsertTags(tags: AjaxTag[]): ThunkAction<void, State, null, Action> {
  return function upsertTagsThunk(dispatch) {
    tags.forEach(tag => dispatch(upsertTagPlain(tag)));
  };
}

export {INIT, SET, UPSERT};
export {setTags, upsertTagPlain, upsertTags};
