import createMergedReducer from "./create_merged_reducer";
import routeReducer from "../route/reducer";
import tagReducer from "../tag/reducer";
import taskReducer from "../task/reducer";

const appReducer = createMergedReducer({
  route: routeReducer,
  tag: tagReducer,
  task: taskReducer,
});

export default appReducer;
