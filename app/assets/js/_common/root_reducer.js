import userReducer from 'js/user/reducer';

const reducers = {user: userReducer};

function initStore() {
  const result = {};

  Object.keys(reducers).forEach(function initReducer(reducerPrefix) {
    const reducer = reducers[reducerPrefix];

    result[reducerPrefix] = reducer(null, {type: `${reducerPrefix}/INIT`});
  });

  return result;
}

function rootReducer(previousState, action) {
  if (action.type === '@@redux/INIT') { return initStore(); }

  const reducerPrefix = action.type.split('/')[0];
  const reducer = reducers[reducerPrefix];

  if (!reducer) { throw new Error(`no reducer for action: "${action.type}"`); }

  const newState = Object.assign({}, previousState);

  newState[reducerPrefix] = reducer(previousState[reducerPrefix], action);

  return newState;
}

export default rootReducer;
