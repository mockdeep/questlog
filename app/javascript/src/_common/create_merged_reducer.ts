import grab from 'src/_helpers/grab';

function getReducerKey(action) {
  return action.type.split('/')[0];
}

function initState(reducerMap) {
  const newState = {};

  Object.keys(reducerMap).forEach(key => {
    const action = {type: `${key}/INIT`};
    const reducer = grab(reducerMap, key);

    newState[key] = reducer(null, action);
  });

  return newState;
}

function createMergedReducer(reducerMap) {
  return function mergedReducer(previousState, action) {
    if (action.type === '@@redux/INIT') { return initState(reducerMap); }

    const reducerKey = getReducerKey(action);
    const reducer = grab(reducerMap, reducerKey);
    const newState = {...previousState};

    newState[reducerKey] = reducer(previousState[reducerKey], action);

    return newState;
  };
}

export default createMergedReducer;
