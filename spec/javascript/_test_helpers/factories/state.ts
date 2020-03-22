import appReducer from 'src/app_reducer';

function makeState(attrs: {[key in keyof State]?: any} = {}): State {
  return Object.keys(attrs).reduce((state: State, key: StateKey) => {
    const action = {type: `${key}/SET`, payload: attrs[key]};

    return {...state, ...appReducer(state, action)};
  }, {});
}

export {makeState};
