import {INIT, SET} from 'src/route/action_creators';
import routeReducer from 'src/route/reducer';

describe(INIT, () => {
  it('returns a route based on the current browser URL', () => {
    const action = {type: INIT};

    expect(routeReducer({}, action)).toEqual({name: 'root', params: {}});

    window.history.replaceState(null, null, '/tasks');

    expect(routeReducer({}, action)).toEqual({name: 'tasks', params: {}});

    window.history.replaceState(null, null, '/my-house');

    const expectedState = {name: 'tag', params: {slug: 'my-house'}};

    expect(routeReducer({}, action)).toEqual(expectedState);

    window.history.replaceState(null, null, '/sessions/new');

    expect(routeReducer({}, action)).toEqual({name: 'sessionsNew', params: {}});
  });
});

describe(SET, () => {
  it('returns a route object corresponding to the given payload', () => {
    const action = {type: SET, payload: {name: 'what', foo: 'bar'}};
    const previousState = {name: 'blah', params: {some: 'thing'}};
    const expectedState = {name: 'what', params: {foo: 'bar'}};

    expect(routeReducer(previousState, action)).toEqual(expectedState);
  });

  it('updates the browser URL', () => {
    const action = {type: SET, payload: {name: 'what', foo: 'bar'}};
    const previousState = {name: 'blah', params: {some: 'thing'}};

    routeReducer(previousState, action);

    expect(window.location.pathname).toBe('/what');
  });
});
