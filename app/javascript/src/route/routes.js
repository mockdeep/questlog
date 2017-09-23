import pathToRegexp from 'path-to-regexp';

function compileRoutes(routes) {
  return routes.map((route) => {
    const regexp = pathToRegexp(route.path);

    return {
      ...route,

      match(path) {
        const result = regexp.exec(path);

        if (!result) { return null; }

        const params = {};

        regexp.keys.forEach((key, index) => {
          params[key.name] = result[index + 1];
        });

        return params;
      },

      toPath: pathToRegexp.compile(route.path),
    };
  });
}

const ROUTES = compileRoutes([
  {name: 'root', path: '/'},
  {name: 'bulkTaskNew', path: '/bulk_task/new'},
  {name: 'freeAccountsNew', path: '/free_accounts/new'},
  {name: 'sessionsNew', path: '/sessions/new'},
  {name: 'sessions', path: '/sessions'},
  {name: 'tasks', path: '/tasks'},
  {name: 'privacy', path: '/privacy'},
  {name: 'what', path: '/what'},
  {name: 'timeframes', path: '/timeframes'},
  {name: 'tags', path: '/tags'},
  {name: 'editTag', path: '/tags/:slug/edit'},
  {name: 'tag', path: '/:slug'},
]);

function findRoute(name) {
  const matchingRoute = ROUTES.find((route) => route.name === name);

  if (!matchingRoute) { throw new Error(`No route found for name: ${name}`); }

  return matchingRoute;
}

function matchPath(path) {
  let params;

  const matchingRoute = ROUTES.find((route) => {
    params = route.match(path);

    return Boolean(params);
  });

  if (!matchingRoute) { throw new Error(`No route found for path: ${path}`); }

  return {name: matchingRoute.name, params};
}

export {findRoute, matchPath};
export default ROUTES;
