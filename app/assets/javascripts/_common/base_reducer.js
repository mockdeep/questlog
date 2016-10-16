import StoneObject from '_common/stone/object';
import userReducer from 'user/reducer';

const reducers = {user: userReducer};

function initStore() {
  const result = {};

  Object.keys(reducers).forEach(function initReducer(reducerPrefix) {
    const reducer = reducers[reducerPrefix];

    result[reducerPrefix] = reducer(null, {type: `${reducerPrefix}/INIT`});
  });

  return new StoneObject(result);
}

function baseReducer(previousState, action) {
  if (action.type === '@@redux/INIT') { return initStore(); }

  const reducerPrefix = action.type.split('/')[0];
  const reducer = reducers[reducerPrefix];

  if (!reducer) { throw new Error(`no reducer for action: "${action.type}"`); }

  const newState = Object.assign({}, previousState);

  newState[reducerPrefix] = reducer(previousState[reducerPrefix], action);

  return new StoneObject(newState);
}

export default baseReducer;
