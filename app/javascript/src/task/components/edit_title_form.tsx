import autobind from 'class-autobind';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, {ChangeEvent, FocusEvent, FormEvent, KeyboardEvent} from 'react';
import Textarea from 'react-textarea-autosize';

import {scratchShape, taskShape} from 'src/shapes';

export type Props = {
  scratch: Scratch,
  task: Task,
  updateScratch: Function,
  updateTask: Function,
};

class TaskEditTitleForm extends React.Component<Props, any> {
  submitting: boolean;

  input: any;

  constructor(props: Props) {
    super(props);
    autobind(this);
    props.updateScratch({
      focused: false,
      submitting: false,
      taskTitle: props.task.title,
    });
  }

  componentWillReceiveProps(newProps: Props) {
    const {task, updateScratch} = this.props;

    if (newProps.task.id !== task.id) {
      updateScratch({focused: false, taskTitle: newProps.task.title});
    }
  }

  updateTitleInput(event: ChangeEvent<HTMLTextAreaElement>) {
    const {updateScratch} = this.props;

    updateScratch({taskTitle: event.target.value});
  }

  async saveTask(event: FocusEvent | FormEvent | KeyboardEvent) {
    event.preventDefault();

    if (this.submitting) { return; }
    this.submitting = true;

    const {scratch, task, updateScratch, updateTask} = this.props;

    this.input.blur();
    updateScratch({focused: false});

    await updateTask(task.id, {title: scratch.taskTitle});
    this.submitting = false;
  }

  submitIfEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') { this.saveTask(event); }
  }

  setFocused() {
    const {updateScratch} = this.props;

    updateScratch({focused: true});
  }

  storeInput(input: HTMLTextAreaElement) {
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
