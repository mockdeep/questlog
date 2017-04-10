import createMergedReducer from 'src/_common/merged_reducer';
import notificationReducer from 'src/notification/reducer';
import tagReducer from 'src/tag/reducer';
import taskReducer from 'src/task/reducer';
import userReducer from 'src/user/reducer';

const appReducer = createMergedReducer({
  notification: notificationReducer,
  tag: tagReducer,
  task: taskReducer,
  user: userReducer,
});

export default appReducer;
