import pathToRegexp, {Key} from 'path-to-regexp';

type Route = {
  name: string;
  path: string;
};

function compileRoutes(routes: Route[]) {
  return routes.map(route => {
    const keys: Key[] = [];
    const regexp = pathToRegexp(route.path, keys);

    return {
      ...route,

      match(path: string) {
        const result = regexp.exec(path);

        if (!result) { return null; }

        const params: {[key: string]: string} = {};

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
  {name: 'treeTasks', path: '/tasks/tree'},
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
