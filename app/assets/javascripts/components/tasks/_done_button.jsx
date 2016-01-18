'use strict';

var React = require('react');

var DoneButton = React.createClass({
  propTypes: {
    completeTask: React.PropTypes.func.isRequired
  },

  markDone: function () {
    if (!this.isTaskReady()) { return; }
    this.props.completeTask(this.props.task.id);
  },

  isTaskReady: function () {
    return this.props.task.loadingState === 'ready';
  },

  doneMessage: function () {
    var isMarkingDone = this.props.task.loadingState === 'marking_done';
    return isMarkingDone ? 'Marking done...' : 'Done! Give me another!';
  },

  render: function () {
    return (
      <input
        type='button'
        disabled={!this.isTaskReady()}
        className='btn btn-primary btn-lg btn-block'
        onClick={this.markDone}
        value={this.doneMessage()}
      />
    );
  }
});

module.exports = DoneButton;
