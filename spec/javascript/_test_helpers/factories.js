import appReducer from 'src/app_reducer';

function makeState(attrs) {
  return Object.keys(attrs).reduce((state, key) => {
    const action = {type: `${key}/SET`, payload: attrs[key]};

    return {...state, ...appReducer(state, action)};
  }, {});
}

function makeTask(attrs) {
  return {
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
