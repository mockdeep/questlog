import {connect} from 'react-redux';

import NotificationCheckbox from 'js/notification/components/checkbox';
import {
  addNotification,
  removeNotification,
} from 'js/notification/action_creators';

function mapStateToProps() {
  return {};
}

const actionCreators = {addNotification, removeNotification};

export default connect(mapStateToProps, actionCreators)(NotificationCheckbox);
