import {matchPath} from "./helpers";

const INIT = "route/INIT";
const SET = "route/SET";

function fetchRoute() {
  return {type: SET, payload: matchPath(window.location.pathname)};
}

export {INIT, SET};
export {fetchRoute};
