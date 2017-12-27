import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import SelectOption from 'src/_common/components/select_option';
import stopPropagation from 'src/_helpers/stop_propagation';
import {taskShape} from 'src/shapes';

function isPostponing(task) {
  return task.loadingState === 'postponing';
}

const selectOptionsOptions = [
  {value: '300', content: '5 minutes'},
  {value: '1800', content: '30 minutes'},
  {value: '3600', content: '1 hour'},
  {value: '10800', content: '3 hours'},
  {value: '21600', content: '6 hours'},
  {value: '32400', content: '9 hours'},
  {value: '43200', content: '12 hours'},
  {value: '86400', content: '1 day'},
  {value: '172800', content: '2 days'},
  {value: '259200', content: '3 days'},
  {value: '604800', content: '1 week'},
  {value: '1209600', content: '2 weeks'},
  {value: '2592000', content: '1 month'},
];

const className = 'btn btn-info btn-lg btn-block postpone-button';

class PostponeButton extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  postponeTask() {
    if (this.props.disabled) { return; }
    this.props.postponeTask(this.props.task.id);
  }

  selectOptions() {
    return selectOptionsOptions.map(this.selectOption);
  }

  selectOption(optionOptions) {
    return (
      <SelectOption
        value={optionOptions.value}
        key={optionOptions.value}
        content={optionOptions.content}
      />
    );
  }

  storePostponeSeconds(event) {
    this.props.storePostponeSeconds(parseInt(event.target.value, 10));
  }

  buttonMessage() {
    return isPostponing(this.props.task) ? 'Postponing...' : 'Postpone for:';
  }

  render() {
    return (
      <div
        id='postpone'
        disabled={this.props.disabled}
        className={className}
        onClick={this.postponeTask}
      >
        <label>
          {this.buttonMessage()}
        </label>
        <select
          onChange={this.storePostponeSeconds}
          onClick={stopPropagation}
          disabled={this.props.disabled}
        >
          {this.selectOptions()}
        </select>
      </div>
    );
  }
}

PostponeButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  postponeTask: PropTypes.func.isRequired,
  storePostponeSeconds: PropTypes.func.isRequired,
  task: taskShape.isRequired,
};

export default PostponeButton;
