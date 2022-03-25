import {createSelector} from 'reselect';

const getRouteParams = createSelector(
  (state: State) => state.route.params,
  routeParams => routeParams,
);

export {getRouteParams};
