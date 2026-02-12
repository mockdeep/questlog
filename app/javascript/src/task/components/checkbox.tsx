import autobind from "class-autobind";
import classnames from "classnames";
import type {ChangeEvent, ReactElement} from "react";
import {Component} from "react";

type Props = {
  task: Task,
  checked?: boolean,
  disabled?: boolean,
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
};

class TaskCheckbox extends Component<Props, never> {
  constructor(props: Props) {
    super(props);
    autobind(this);
  }

  labelClass(): string {
    const {checked, disabled} = this.props;
    return classnames({
      "task-item__checkbox-display": true,
      "task-item__checkbox-display--checked": checked,
      "task-item__checkbox-display--enabled": !disabled,
    });
  }

  render(): ReactElement {
    const {checked, disabled, onChange, task} = this.props;
    const inputId = `complete-task-${task.id}`;

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
        <label htmlFor={inputId} className={this.labelClass()} />
      </div>
    );
  }
}

export default TaskCheckbox;
