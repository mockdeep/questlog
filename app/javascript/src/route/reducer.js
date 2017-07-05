import ROUTES, {findRoute} from 'src/route/routes';
import {INIT, SET} from 'src/route/action_creators';

function routeReducer(previousState, action) {
  if (action.type === SET) {
    const {name, ...params} = action.payload;
    const matchingRoute = findRoute(name);

    window.history.pushState(null, null, matchingRoute.toPath(params));

    return {name: matchingRoute.name, params};
  } else if (action.type === INIT) {
    let params;

    const matchingRoute = ROUTES.find((route) => {
      params = route.match(window.location.pathname);

      return Boolean(params);
    });

    return {name: matchingRoute.name, params};
  }

  throw new Error(`unhandled action type: ${action.type}`);
}

export default routeReducer;
