'use strict';

var React = require('react');

var DoneButton = React.createClass({
  propTypes: {
    completeTask: React.PropTypes.func.isRequired
  },

  disableButton: function () {
    this.props.disable();
  },

  markDone: function () {
    if (this.props.disabled) { return; }
    this.disableButton();
    this.props.completeTask(this.props.task.id);
  },

  doneMessage: function () {
    var isMarkingDone = this.props.task.status === 'marking_done';
    return isMarkingDone ? 'Marking done...' : 'Done! Give me another!';
  },

  render: function () {
    return (
      <input
        type='button'
        disabled={this.props.disabled}
        className='btn btn-primary btn-lg btn-block'
        onClick={this.markDone}
        value={this.doneMessage()}
      />
    );
  }
});

module.exports = DoneButton;
