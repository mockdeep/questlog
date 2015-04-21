'use strict';

var helpers = require('../helpers');

var DoneButton = React.createClass({
  getInitialState: function () {
    return {buttonContent: 'Done! Give me another!'};
  },

  disableButton: function () {
    this.setState({buttonContent: 'Marking done...'});
    this.props.disable();
  },

  updateButton: function () {
    this.setState({buttonContent: 'Success!'});
    this.props.loadTask();
  },

  markDone: function () {
    if (this.props.disabled) { return; }
    this.disableButton();
    helpers.request({
      url: 'tasks/' + this.props.task.id,
      data: {task: {done: true}},
      success: this.updateButton,
    });
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
