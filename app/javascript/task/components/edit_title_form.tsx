import autobind from "class-autobind";
import classnames from "classnames";
import type {FocusEvent, FormEvent, KeyboardEvent, ReactElement} from "react";
import {Component, createRef} from "react";
import Textarea from "react-textarea-autosize";

import AuthenticityToken from "../../_common/components/authenticity_token";
import {assert} from "helpers";

export type Props = {
  task: Task,
};

type State = {
  focused: boolean;
}

class TaskEditTitleForm extends Component<Props, State> {
  formRef = createRef<HTMLFormElement>();

  constructor(props: Props) {
    super(props);
    autobind(this);
    this.state = {focused: false};
  }

  override componentDidUpdate(prevProps: Props): void {
    const {task} = this.props;

    if (prevProps.task.id !== task.id) {
      this.setState({focused: false});
    }
  }

  saveTask(event: FocusEvent | FormEvent | KeyboardEvent): void {
    event.preventDefault();
    assert(this.formRef.current).submit();
  }

  submitIfEnter(event: KeyboardEvent): void {
    if (event.key === "Enter") { this.saveTask(event); }
  }

  setFocused(): void {
    this.setState({focused: true});
  }

  className(): string {
    const {focused} = this.state;

    return classnames({"task-input": true, "hidden-border": !focused});
  }

  override render(): ReactElement {
    const {task} = this.props;

    return (
      <form action={`/tasks/${task.id}`} method='post' ref={this.formRef}>
        <input type='hidden' name='_method' value='patch' autoComplete='off' />
        <AuthenticityToken />
        <Textarea
          name={"task[title]"}
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
