import appReducer from "src/_common/app_reducer";

const stateKeys = ["common", "notification", "route", "tag", "task", "user"];

function isStateKey(value: string): value is StateKey {
  return stateKeys.includes(value);
}
function makeState(
  attrs: {[key in keyof State]?: any} = {},
  previousState: State | null = null,
): State {
  let state: State = previousState || appReducer(null, null);

  Object.keys(attrs).forEach((key: string) => {
    if (!isStateKey(key)) { throw new Error(`invalid key ${key}`); }

    const action = {type: `${key}/SET`, payload: attrs[key]};

    state = {...state, ...appReducer(state, action)};
  });

  return state;
}

export {makeState};
