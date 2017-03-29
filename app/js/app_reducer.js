import createMergedReducer from 'js/_common/merged_reducer';
import taskReducer from 'js/task/reducer';
import userReducer from 'js/user/reducer';

export default createMergedReducer({task: taskReducer, user: userReducer});
