import {createSelector} from 'reselect';

const getRouteName = createSelector(
  state => state.route.name,
  routeName => routeName
);

const getRouteParams = createSelector(
  state => state.route.params,
  routeParams => routeParams
);

export {getRouteName, getRouteParams};
