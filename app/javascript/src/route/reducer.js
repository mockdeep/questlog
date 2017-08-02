import createBasicReducer from 'src/_common/create_basic_reducer';
import ROUTES, {findRoute} from 'src/route/routes';
import {INIT, SET} from 'src/route/action_creators';

export default createBasicReducer({
  [INIT]() {
    const path = window.location.pathname;
    let params;

    const matchingRoute = ROUTES.find((route) => {
      params = route.match(path);

      return Boolean(params);
    });

    if (!matchingRoute) { throw new Error(`No route found for path: ${path}`); }

    return {name: matchingRoute.name, params};
  },

  [SET](previousState, payload) {
    const {name, ...params} = payload;
    const matchingRoute = findRoute(name);

    if (!matchingRoute) { throw new Error(`No route found for name: ${name}`); }

    window.history.pushState(null, null, matchingRoute.toPath(params));

    return {name: matchingRoute.name, params};
  },
});
