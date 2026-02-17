import {pathToRegexp, compile} from "path-to-regexp";

import {grab} from "helpers";

type Route = {
  name: string;
  path: string;
};

function compileRoutes(routes: Route[]) {
  return routes.map(route => {
    const { regexp, keys } = pathToRegexp(route.path);

    return {
      ...route,

      match(path: string) {
        const result = regexp.exec(path);

        if (!result) { return null; }

        const params: {[key: string]: string} = {};

        keys.forEach((key, index) => {
          params[key.name] = grab(result, index + 1);
        });

        return params;
      },

      toPath: compile(route.path),
    };
  });
}

const ROUTES = compileRoutes([
  {name: "root", path: "/"},
  {name: "leafTasks", path: "/leaf_tasks"},
  {name: "rootTasks", path: "/root_tasks"},
  {name: "treeTasks", path: "/tree_tasks"},
  {name: "showTask", path: "/tasks/:taskId"},
  {name: "tasks", path: "/tasks"},
  {name: "timeframes", path: "/timeframes"},
  {name: "tags", path: "/tags"},
  {name: "editTag", path: "/tags/:slug/edit"},
  {name: "tag", path: "/tags/:slug"},
]);

export default ROUTES;
