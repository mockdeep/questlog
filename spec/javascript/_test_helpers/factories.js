import appReducer from 'src/app_reducer';

let nextTagId = 0;
let nextTaskId = 0;

function makeState(attrs) {
  return Object.keys(attrs).reduce((state, key) => {
    const action = {type: `${key}/SET`, payload: attrs[key]};

    return {...state, ...appReducer(state, action)};
  }, {});
}

function makeTag(attrs) {
  nextTagId += 1;

  return {
    id: nextTagId,
    priority: null,
    rules: [],
    tasks: [],
    ...attrs,
  };
}

function makeTask(attrs) {
  nextTaskId += 1;

  return {
    id: nextTaskId,
    estimateMinutes: 30,
    loadingState: 'ready',
    priority: null,
    status: 'active',
    tagIds: [],
    tagNames: [],
    timeframe: null,
    ...attrs,
  };
}

export {makeState, makeTag, makeTask};
