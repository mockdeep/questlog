import {connect} from 'react-redux';

import NotificationCheckbox from 'src/notification/components/checkbox';
import {
  addNotification,
  removeNotification,
} from 'src/notification/action_creators';

function mapStateToProps() {
  return {};
}

const actionCreators = {addNotification, removeNotification};

export default connect(mapStateToProps, actionCreators)(NotificationCheckbox);
