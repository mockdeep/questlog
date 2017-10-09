import commonReducer from 'src/_common/reducer';
import createMergedReducer from 'src/_common/create_merged_reducer';
import notificationReducer from 'src/notification/reducer';
import routeReducer from 'src/route/reducer';
import scratchReducer from 'src/scratch/reducer';
import tagReducer from 'src/tag/reducer';
import taskReducer from 'src/task/reducer';
import userReducer from 'src/user/reducer';

const appReducer = createMergedReducer({
  common: commonReducer,
  notification: notificationReducer,
  route: routeReducer,
  scratch: scratchReducer,
  tag: tagReducer,
  task: taskReducer,
  user: userReducer,
});

export default appReducer;
