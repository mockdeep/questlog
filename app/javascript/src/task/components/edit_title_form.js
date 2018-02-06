import autobind from 'class-autobind';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Textarea from 'react-textarea-autosize';

import {scratchShape, taskShape} from 'src/shapes';

class TaskEditTitleForm extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
    props.updateScratch({
      focused: false,
      submitting: false,
      taskTitle: props.task.title,
    });
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

  async saveTask(event) {
    event.preventDefault();

    if (this.submitting) { return; }
    this.submitting = true;

    const {scratch, task, updateScratch, updateTask} = this.props;

    this.input.blur();
    updateScratch({focused: false});

    await updateTask(task.id, {title: scratch.taskTitle});
    this.submitting = false;
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

  className() {
    const {scratch} = this.props;

    return classnames({'task-input': true, 'hidden-border': !scratch.focused});
  }

  render() {
    const {scratch, task} = this.props;

    return (
      <form onSubmit={this.saveTask}>
        <Textarea
          inputRef={this.storeInput}
          name={'task-title'}
          className={this.className()}
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
