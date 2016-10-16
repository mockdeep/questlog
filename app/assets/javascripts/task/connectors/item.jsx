'use strict';

import React from 'react';
import store from '_common/store';
import {connect} from 'react-redux';
import {updateUser} from 'user/actions';

const TaskItem = require('task/containers/item');

function enableNotifications() {
  store.dispatch(updateUser({notificationsEnabled: true}));
}

function disableNotifications() {
  store.dispatch(updateUser({notificationsEnabled: false}));
}

const ItemConnector = React.createClass({
  propTypes: {params: React.PropTypes.object.isRequired},

  render() {
    return (
      <TaskItem
        params={this.props.params}
        notificationsEnabled={Boolean(store.getState().user.notificationsEnabled)}
        enableNotifications={enableNotifications}
        disableNotifications={disableNotifications}
      />
    );
  }
});

function mapStateToProps(state) {
  return {user: state.user};
}

export default connect(mapStateToProps)(ItemConnector);
