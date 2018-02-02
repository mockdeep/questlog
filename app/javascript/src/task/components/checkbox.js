import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import {taskShape} from 'src/shapes';

class TaskCheckbox extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  render() {
    const {checked, disabled, onChange, task} = this.props;
    const inputId = `complete-task-${task.id}`;
    let labelClass = 'task-item__checkbox-display';

    if (checked) { labelClass += ' task-item__checkbox-display--checked'; }
    if (!disabled) { labelClass += ' task-item__checkbox-display--enabled'; }

    return (
      <div className='task-item__checkbox'>
        <input
          type='checkbox'
          id={inputId}
          checked={checked}
          disabled={disabled}
          className='task-item__checkbox-actual'
          onChange={onChange}
        />
        <label htmlFor={inputId} className={labelClass} />
      </div>
    );
  }
}

TaskCheckbox.propTypes = {
  task: taskShape.isRequired,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default TaskCheckbox;
