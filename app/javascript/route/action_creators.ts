const INIT = "route/INIT";
const SET = "route/SET";

function setRoute(route: Partial<RouteState>) {
  const {name, params} = route;

  if (name === undefined || name.length === 0) {
    throw new Error("mount element is missing its route name");
  }

  return {type: SET, payload: {name, params: params ?? {}}};
}

export {INIT, SET};
export {setRoute};
