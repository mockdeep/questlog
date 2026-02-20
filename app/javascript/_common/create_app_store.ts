import {applyMiddleware, createStore} from "redux";
import {thunk} from "redux-thunk";

import appReducer from "./app_reducer";

function createAppStore() {
  return createStore(appReducer, applyMiddleware(thunk));
}

export default createAppStore;
