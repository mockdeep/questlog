import {findRoute, matchPath} from 'src/route/helpers';

const INIT = 'route/INIT';
const SET = 'route/SET';

type Payload = {
  name: string;
};

function fetchRoute() {
  return {type: SET, payload: matchPath(window.location.pathname)};
}

function setRoute(payload: Payload) {
  const {name, ...params} = payload;
  const matchingRoute = findRoute(name);

  window.history.pushState(null, null, matchingRoute.toPath(params));

  return {type: SET, payload: {name: matchingRoute.name, params}};
}

export {INIT, SET};
export {fetchRoute, setRoute};
