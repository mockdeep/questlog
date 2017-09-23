import ROUTES from 'src/route/routes';

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
