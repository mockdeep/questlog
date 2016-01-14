'use strict';

var React = require('react');

var TaskStore = require('stores/task_store');

var DoneButton = React.createClass({
  getInitialState: function () {
    return {buttonContent: 'Done! Give me another!'};
  },

  disableButton: function () {
    this.setState({buttonContent: 'Marking done...'});
    this.props.disable();
  },

  markDone: function () {
    if (this.props.disabled) { return; }
    this.disableButton();
    TaskStore.update(this.props.task.id, {done: true});
  },

  componentWillReceiveProps: function (newProps) {
    if (!newProps.disabled) {
      this.replaceState(this.getInitialState());
    }
  },

  render: function () {
    return (
      <input
        type='button'
        disabled={this.props.disabled}
        className='btn btn-primary btn-lg btn-block'
        onClick={this.markDone}
        value={this.state.buttonContent}
      />
    );
  }
});

module.exports = DoneButton;
