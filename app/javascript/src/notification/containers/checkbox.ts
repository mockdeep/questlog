import {connect} from 'react-redux';

import NotificationCheckbox from 'src/notification/components/checkbox';
import {
  addNotification,
  removeNotification,
} from 'src/notification/action_creators';
import {updateUser} from 'src/user/action_creators';

function mapStateToProps(state) {
  return {notificationsEnabled: Boolean(state.user.notificationsEnabled)};
}

const actionCreators = {addNotification, removeNotification, updateUser};

export default connect(mapStateToProps, actionCreators)(NotificationCheckbox);
