import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';
import Textarea from 'react-textarea-autosize';

import {scratchShape, taskShape} from 'src/shapes';

class TaskEditTitleForm extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
    props.updateScratch({focused: false, taskTitle: props.task.title});
  }

  componentWillReceiveProps(newProps) {
    const {task, updateScratch} = this.props;

    if (newProps.task.id !== task.id) {
      updateScratch({focused: false, taskTitle: newProps.task.title});
    }
  }

  updateTitleInput(event) {
    const {updateScratch} = this.props;

    updateScratch({taskTitle: event.target.value});
  }

  saveTask(event) {
    event.preventDefault();
    const {scratch, task, updateScratch, updateTask} = this.props;

    this.input.blur();
    updateTask(task.id, {title: scratch.taskTitle});
    updateScratch({focused: false});
  }

  submitIfEnter(event) {
    if (event.key === 'Enter') { this.saveTask(event); }
  }

  setFocused() {
    const {updateScratch} = this.props;

    updateScratch({focused: true});
  }

  storeInput(input) {
    this.input = input;
  }

  render() {
    const {scratch, task} = this.props;

    return (
      <form onSubmit={this.saveTask}>
        <Textarea
          inputRef={this.storeInput}
          name={'task-title'}
          className={`task-input${scratch.focused ? '' : ' hidden-border'}`}
          value={scratch.taskTitle || task.title}
          onKeyPress={this.submitIfEnter}
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
