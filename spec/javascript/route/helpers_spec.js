import {findRoute, matchPath} from 'src/route/helpers';

describe('findRoute', () => {
  it('returns a root route', () => {
    const route = findRoute('root');

    expect(route.name).toBe('root');
    expect(route.toPath()).toBe('/');
  });

  it('returns a basic route', () => {
    const route = findRoute('tasks');

    expect(route.name).toBe('tasks');
    expect(route.toPath()).toBe('/tasks');
  });

  it('returns a route that can be compiled with a param', () => {
    const route = findRoute('tag');

    expect(route.name).toBe('tag');
    expect(route.toPath({slug: 'foo'})).toBe('/foo');
  });

  it('returns a nested route', () => {
    const route = findRoute('sessionsNew');

    expect(route.name).toBe('sessionsNew');
    expect(route.toPath()).toBe('/sessions/new');
  });

  it('raises an error when a route cannot be found', () => {
    expect(() => { findRoute('booRoute'); }).toThrow(/No route found/);
  });
});

describe('matchPath', () => {
  it('returns a match for a root route', () => {
    const match = matchPath('/');

    expect(match).toEqual({name: 'root', params: {}});
  });

  it('returns a match for a basic route', () => {
    const match = matchPath('/tasks');

    expect(match).toEqual({name: 'tasks', params: {}});
  });

  it('returns a match with a route param', () => {
    const match = matchPath('/foo');

    expect(match).toEqual({name: 'tag', params: {slug: 'foo'}});
  });

  it('returns a match with a nested route', () => {
    const match = matchPath('/sessions/new');

    expect(match).toEqual({name: 'sessionsNew', params: {}});
  });

  it('raises an error when a match cannot be found', () => {
    expect(() => { matchPath('/not/a/route'); }).toThrow(/No route found/);
  });
});
