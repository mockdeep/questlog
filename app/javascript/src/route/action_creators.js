import ROUTES, {findRoute} from 'src/route/routes';

const INIT = 'route/INIT';
const SET = 'route/SET';

function fetchRoute() {
  const path = window.location.pathname;
  let params;

  const matchingRoute = ROUTES.find((route) => {
    params = route.match(path);

    return Boolean(params);
  });

  if (!matchingRoute) { throw new Error(`No route found for path: ${path}`); }

  return {type: SET, payload: {name: matchingRoute.name, params}};
}

function setRoute(payload) {
  const {name, ...params} = payload;
  const matchingRoute = findRoute(name);

  if (!matchingRoute) { throw new Error(`No route found for name: ${name}`); }

  window.history.pushState(null, null, matchingRoute.toPath(params));

  return {type: SET, payload: {name: matchingRoute.name, params}};
}

export {INIT, SET};
export {fetchRoute, setRoute};
