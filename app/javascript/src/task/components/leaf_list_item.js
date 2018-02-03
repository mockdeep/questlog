import autobind from 'class-autobind';
import React from 'react';

import {taskShape} from 'src/shapes';

class TaskLeafListItem extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  render() {
    const {task} = this.props;

    return <li>{task.title}</li>;
  }
}

TaskLeafListItem.propTypes = {
  task: taskShape.isRequired,
};

export default TaskLeafListItem;
