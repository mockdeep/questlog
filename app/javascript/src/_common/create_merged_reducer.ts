import {Reducer} from 'redux';

/* eslint-disable no-unused-vars */
type ReducerKey = 'common' | 'route' | 'tag' | 'task';
type ReducerMap = {[key: string]: Reducer};
/* eslint-enable no-unused-vars */
const VALID_REDUCER_KEYS = [
  'common',
  'notification',
  'route',
  'scratch',
  'tag',
  'task',
  'user',
];

function isReducerKey(key: string): key is ReducerKey {
  return VALID_REDUCER_KEYS.includes(key);
}

function getReducerKey(action: BasicAction) {
  const key = action.type.split('/')[0];

  if (!isReducerKey(key)) { throw new Error(`invalid reducer key "${key}"`); }

  return key;
}

function initState(reducerMap: ReducerMap) {
  const newState: any = {};

  Object.keys(reducerMap).forEach(key => {
    const action = {type: `${key}/INIT`};
    const reducer = reducerMap[key];

    newState[key] = reducer(null, action);
  });

  return newState;
}

function createMergedReducer(reducerMap: ReducerMap) {
  return function mergedReducer(
    previousState: State,
    action: BasicAction | any,
  ) {
    if (action.type.startsWith('@@redux/INIT')) {
      return initState(reducerMap);
    }

    const reducerKey = getReducerKey(action);
    const reducer = reducerMap[reducerKey];
    const newState = {...previousState};

    newState[reducerKey] = reducer(previousState[reducerKey], action);

    return newState;
  };
}

export default createMergedReducer;
