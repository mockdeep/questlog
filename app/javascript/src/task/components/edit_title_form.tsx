import autobind from 'class-autobind';
import classnames from 'classnames';
import type {FocusEvent, FormEvent, KeyboardEvent, ReactElement} from 'react';
import React from 'react';
import Textarea from 'react-textarea-autosize';

import AuthenticityToken from 'src/_common/components/authenticity_token';
import {assert} from 'src/_helpers/assert';

export type Props = {
  task: Task,
};

type State = {
  focused: boolean;
}

class TaskEditTitleForm extends React.Component<Props, State> {
  formRef = React.createRef<HTMLFormElement>();

  constructor(props: Props) {
    super(props);
    autobind(this);
    this.state = {focused: false};
  }

  UNSAFE_componentWillReceiveProps(newProps: Props): void {
    const {task} = this.props;

    if (newProps.task.id !== task.id) {
      this.setState({focused: false});
    }
  }

  saveTask(event: FocusEvent | FormEvent | KeyboardEvent): void {
    event.preventDefault();
    assert(this.formRef.current).submit();
  }

  submitIfEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter') { this.saveTask(event); }
  }

  setFocused(): void {
    this.setState({focused: true});
  }

  className(): string {
    const {focused} = this.state;

    return classnames({'task-input': true, 'hidden-border': !focused});
  }

  render(): ReactElement {
    const {task} = this.props;

    return (
      <form action={`/tasks/${task.id}`} method='post' ref={this.formRef}>
        <input type='hidden' name='_method' value='patch' autoComplete='off' />
        <AuthenticityToken />
        <Textarea
          name={'task[title]'}
          className={this.className()}
          defaultValue={task.title}
          onKeyPress={this.submitIfEnter}
          onBlur={this.saveTask}
          onFocus={this.setFocused}
        />
      </form>
    );
  }
}

export default TaskEditTitleForm;
