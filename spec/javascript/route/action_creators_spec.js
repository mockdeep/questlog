import {
  SET,
  setRoute, fetchRoute,
} from 'src/route/action_creators';

afterEach(() => {
  window.history.replaceState(null, null, '/');
});

describe('fetchRoute', () => {
  it('returns a SET action with "root" for the default url', () => {
    const expectedAction = {type: SET, payload: {name: 'root', params: {}}};

    expect(fetchRoute()).toEqual(expectedAction);
  });

  it('returns a SET action with "tasks" when route is "/tasks"', () => {
    const expectedAction = {type: SET, payload: {name: 'tasks', params: {}}};

    window.history.replaceState(null, null, '/tasks');

    expect(fetchRoute()).toEqual(expectedAction);
  });

  it('returns a SET action with slug for tag route', () => {
    const payload = {name: 'tag', params: {slug: 'my-house'}};
    const expectedAction = {type: SET, payload};

    window.history.replaceState(null, null, '/my-house');

    expect(fetchRoute()).toEqual(expectedAction);
  });

  it('returns a SET action for a nested url', () => {
    const expectedAction = {type: SET, payload: {name: 'sessionsNew', params: {}}};

    window.history.replaceState(null, null, '/sessions/new');

    expect(fetchRoute()).toEqual(expectedAction);
  });

  it('raises an error when the current route cannot be matched', () => {
    window.history.replaceState(null, null, '/not/a/route');

    expect(() => { fetchRoute(); }).toThrow(/No route found/);
  });
});

describe('setRoute', () => {
  it('returns a SET action corresponding to the given route', () => {
    const payload = {name: 'what', foo: 'bar'};
    const expectedPayload = {name: 'what', params: {foo: 'bar'}};
    const expectedAction = {type: SET, payload: expectedPayload};

    setRoute(payload);

    expect(setRoute(payload)).toEqual(expectedAction);
  });

  it('updates the browser url', () => {
    const payload = {name: 'what', foo: 'bar'};

    setRoute(payload);

    expect(window.location.pathname).toBe('/what');
  });

  it('raises an error when a route cannot be found', () => {
    const payload = {name: 'not-a-route'};

    expect(() => { setRoute(payload); }).toThrow(/No route found/);
  });
});
