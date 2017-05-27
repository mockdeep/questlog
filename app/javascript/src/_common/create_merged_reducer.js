function getReducerKey(action) {
  return action.type.split('/')[0];
}

function fetchReducer(reducerMap, reducerKey) {
  const reducer = reducerMap[reducerKey];

  if (!reducer) { throw new Error(`no reducer found for: "${reducerKey}"`); }

  return reducer;
}

function initState(reducerMap) {
  const newState = {};

  Object.keys(reducerMap).forEach((key) => {
    const action = {type: `${key}/INIT`};
    const reducer = reducerMap[key];

    newState[key] = reducer(null, action);
  });

  return newState;
}

function createMergedReducer(reducerMap) {
  return function mergedReducer(previousState, action) {
    if (action.type === '@@redux/INIT') { return initState(reducerMap); }

    const reducerKey = getReducerKey(action);
    const reducer = fetchReducer(reducerMap, reducerKey);
    const newState = {...previousState};

    newState[reducerKey] = reducer(previousState[reducerKey], action);

    return newState;
  };
}

export default createMergedReducer;
