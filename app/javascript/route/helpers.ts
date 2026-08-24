import ROUTES from "./routes";

function matchPath(path: string) {
  let params;

  const matchingRoute = ROUTES.find(route => {
    params = route.match(path);

    return Boolean(params);
  });

  if (!matchingRoute) { throw new Error(`No route found for path: ${path}`); }

  return {name: matchingRoute.name, params};
}

export {matchPath};
