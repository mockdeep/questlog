import createMergedReducer from 'js/_common/merged_reducer';
import notificationReducer from 'js/notification/reducer';
import taskReducer from 'js/task/reducer';
import userReducer from 'js/user/reducer';

const appReducer = createMergedReducer({
  notification: notificationReducer,
  task: taskReducer,
  user: userReducer,
});

export default appReducer;
