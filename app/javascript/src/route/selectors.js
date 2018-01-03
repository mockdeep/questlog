import {createSelector} from 'reselect';

const getRouteName = createSelector(
  state => state.route.name,
  routeName => routeName
);

export {getRouteName};
