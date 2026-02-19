import createMergedReducer from "src/_common/create_merged_reducer";
import routeReducer from "src/route/reducer";
import tagReducer from "src/tag/reducer";
import taskReducer from "src/task/reducer";

const appReducer = createMergedReducer({
  route: routeReducer,
  tag: tagReducer,
  task: taskReducer,
});

export default appReducer;
