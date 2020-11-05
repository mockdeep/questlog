import autobind from 'class-autobind';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, {ChangeEvent, FocusEvent, FormEvent, KeyboardEvent} from 'react';
import Textarea from 'react-textarea-autosize';

import {taskShape} from 'src/shapes';

export type Props = {
  task: Task,
  updateTask: Function,
};

type State = {
  taskTitle: string;
  focused: boolean;
}

class TaskEditTitleForm extends React.Component<Props, State> {
  submitting = false;

  input: any;

  constructor(props: Props) {
    super(props);
    autobind(this);
    this.state = {
      focused: false,
      taskTitle: props.task.title,
    };
  }

  componentWillReceiveProps(newProps: Props) {
    const {task} = this.props;

    if (newProps.task.id !== task.id) {
      this.setState({focused: false, taskTitle: newProps.task.title});
    }
  }

  updateTitleInput(event: ChangeEvent<HTMLTextAreaElement>) {
    this.setState({taskTitle: event.target.value});
  }

  async saveTask(event: FocusEvent | FormEvent | KeyboardEvent) {
    event.preventDefault();

    if (this.submitting) { return; }
    this.submitting = true;

    const {task, updateTask} = this.props;
    const {taskTitle} = this.state;

    this.input.blur();
    this.setState({focused: false});

    await updateTask(task.id, {title: taskTitle});
    this.submitting = false;
  }

  submitIfEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') { this.saveTask(event); }
  }

  setFocused() {
    this.setState({focused: true});
  }

  storeInput(input: HTMLTextAreaElement) {
    this.input = input;
  }

  className() {
    const {focused} = this.state;

    return classnames({'task-input': true, 'hidden-border': !focused});
  }

  render() {
    const {task} = this.props;
    const {taskTitle} = this.state;

    return (
      <form onSubmit={this.saveTask}>
        <Textarea
          inputRef={this.storeInput}
          name={'task-title'}
          className={this.className()}
          value={taskTitle || task.title}
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
  task: taskShape.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default TaskEditTitleForm;
