import {createSelector} from 'reselect';

const getRouteName = createSelector(
  (state: State) => state.route.name,
  routeName => routeName
);

const getRouteParams = createSelector(
  (state: State) => state.route.params,
  routeParams => routeParams
);

export {getRouteName, getRouteParams};
