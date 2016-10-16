'use strict';

import React from 'react';
import {connect} from 'react-redux';

const TaskItem = require('task/containers/item');

const ItemConnector = React.createClass({
  propTypes: {params: React.PropTypes.object.isRequired},

  render() {
    return <TaskItem params={this.props.params} />;
  }
});

function mapStateToProps(state) {
  return {user: state.user};
}

export default connect(mapStateToProps)(ItemConnector);
