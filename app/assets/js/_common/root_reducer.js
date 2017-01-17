import createMergedReducer from 'js/_common/merged_reducer';
import userReducer from 'js/user/reducer';

export default createMergedReducer({user: userReducer});
