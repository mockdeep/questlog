import createMergedReducer from 'src/_common/create_merged_reducer';
import notificationReducer from 'src/notification/reducer';
import routeReducer from 'src/route/reducer';
import tagReducer from 'src/tag/reducer';
import taskReducer from 'src/task/reducer';
import userReducer from 'src/user/reducer';

const appReducer = createMergedReducer({
  notification: notificationReducer,
  route: routeReducer,
  tag: tagReducer,
  task: taskReducer,
  user: userReducer,
});

export default appReducer;
