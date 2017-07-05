import createBasicReducer from 'src/_common/create_basic_reducer';
import ROUTES, {findRoute} from 'src/route/routes';
import {INIT, SET} from 'src/route/action_creators';

export default createBasicReducer({
  [INIT]() {
    let params;

    const matchingRoute = ROUTES.find((route) => {
      params = route.match(window.location.pathname);

      return Boolean(params);
    });

    return {name: matchingRoute.name, params};
  },

  [SET](previousState, payload) {
    const {name, ...params} = payload;
    const matchingRoute = findRoute(name);

    window.history.pushState(null, null, matchingRoute.toPath(params));

    return {name: matchingRoute.name, params};
  },
});
