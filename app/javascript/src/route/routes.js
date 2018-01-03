import pathToRegexp from 'path-to-regexp';

function compileRoutes(routes) {
  return routes.map(route => {
    const keys = [];
    const regexp = pathToRegexp(route.path, keys);

    return {
      ...route,

      match(path) {
        const result = regexp.exec(path);

        if (!result) { return null; }

        const params = {};

        keys.forEach((key, index) => {
          params[key.name] = result[index + 1];
        });

        return params;
      },

      toPath: pathToRegexp.compile(route.path),
    };
  });
}

const ROUTES = compileRoutes([
  {name: 'root', path: '/'},
  {name: 'bulkTaskNew', path: '/bulk_task/new'},
  {name: 'freeAccountsNew', path: '/free_accounts/new'},
  {name: 'sessionsNew', path: '/sessions/new'},
  {name: 'sessions', path: '/sessions'},
  {name: 'leafTasks', path: '/tasks/leaf'},
  {name: 'rootTasks', path: '/tasks/root'},
  {name: 'showTask', path: '/tasks/:taskId'},
  {name: 'tasks', path: '/tasks'},
  {name: 'privacy', path: '/privacy'},
  {name: 'what', path: '/what'},
  {name: 'timeframes', path: '/timeframes'},
  {name: 'tags', path: '/tags'},
  {name: 'editTag', path: '/tags/:slug/edit'},
  {name: 'tag', path: '/:slug'},
]);

export default ROUTES;
