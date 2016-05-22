'use strict';

const React = require('react');

const DoneButton = React.createClass({
  propTypes: {
    completeTask: React.PropTypes.func.isRequired,
    task: React.PropTypes.object.isRequired
  },

  markDone: function () {
    if (!this.isTaskReady()) { return; }
    this.props.completeTask(this.props.task.id);
  },

  isTaskReady: function () {
    return this.props.task.loadingState === 'ready';
  },

  buttonMessage: function () {
    const isMarkingDone = this.props.task.loadingState === 'marking_done';

    return isMarkingDone ? 'Marking done...' : 'Done! Give me another!';
  },

  render: function () {
    return (
      <input
        type='button'
        disabled={!this.isTaskReady()}
        className='btn btn-primary btn-lg btn-block'
        onClick={this.markDone}
        value={this.buttonMessage()}
      />
    );
  }
});

module.exports = DoneButton;
