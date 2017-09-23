import {findRoute, matchPath} from 'src/route/routes';

const INIT = 'route/INIT';
const SET = 'route/SET';

function fetchRoute() {
  return {type: SET, payload: matchPath(window.location.pathname)};
}

function setRoute(payload) {
  const {name, ...params} = payload;
  const matchingRoute = findRoute(name);

  window.history.pushState(null, null, matchingRoute.toPath(params));

  return {type: SET, payload: {name: matchingRoute.name, params}};
}

export {INIT, SET};
export {fetchRoute, setRoute};
