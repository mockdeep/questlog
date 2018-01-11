import appReducer from 'src/app_reducer';

function makeState(attrs) {
  return Object.keys(attrs).reduce((state, key) => {
    const action = {type: `${key}/SET`, payload: attrs[key]};

    return {...state, ...appReducer(state, action)};
  }, {});
}

let nextTaskId = 0;

function makeTask(attrs) {
  nextTaskId += 1;

  return {
    id: nextTaskId,
    estimateMinutes: 30,
    loadingState: 'ready',
    priority: null,
    tagIds: [],
    timeframe: null,
    subTaskIds: [],
    ...attrs,
  };
}

export {makeState, makeTask};
