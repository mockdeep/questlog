import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import {scratchShape, taskShape} from 'src/shapes';

class TaskEditTitleForm extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
    props.updateScratch({focused: false, taskTitle: props.task.title});
  }

  componentWillReceiveProps(newProps) {
    if (newProps.task.id !== this.props.task.id) {
      this.props.updateScratch({focused: false, taskTitle: newProps.task.title});
    }
  }

  updateTitleInput(event) {
    this.props.updateScratch({taskTitle: event.target.value});
  }

  saveTask(event) {
    event.preventDefault();
    const {task, updateTask} = this.props;

    this.input.blur();
    updateTask(task.id, {title: this.props.scratch.taskTitle});
    this.props.updateScratch({focused: false});
  }

  setFocused() {
    this.props.updateScratch({focused: true});
  }

  storeInput(input) {
    this.input = input;
  }

  render() {
    const {scratch, task} = this.props;

    return (
      <form onSubmit={this.saveTask}>
        <input
          ref={this.storeInput}
          name={'task-title'}
          className={`task-input${scratch.focused ? '' : ' hidden-border'}`}
          value={scratch.taskTitle || task.title}
          onChange={this.updateTitleInput}
          onBlur={this.saveTask}
          onFocus={this.setFocused}
        />
      </form>
    );
  }
}

TaskEditTitleForm.propTypes = {
  scratch: scratchShape.isRequired,
  task: taskShape.isRequired,
  updateScratch: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default TaskEditTitleForm;
