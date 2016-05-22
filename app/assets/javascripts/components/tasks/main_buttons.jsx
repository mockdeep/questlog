'use strict';

const React = require('react');

const DoneButton = require('components/tasks/done_button');
const PostponeButton = require('components/tasks/postpone_button');

const MainButtons = React.createClass({
  propTypes: {
    task: React.PropTypes.object.isRequired,
    postponeSeconds: React.PropTypes.number.isRequired,
    postponeTask: React.PropTypes.func.isRequired,
    completeTask: React.PropTypes.func.isRequired,
    loadTask: React.PropTypes.func.isRequired,
    storePostponeSeconds: React.PropTypes.func.isRequired,
    disable: React.PropTypes.func.isRequired,
    disabled: React.PropTypes.bool.isRequired
  },

  render: function () {
    return (
      <div id='buttons' className='row main-button'>
        <div className='col-md-6'>
          <DoneButton
            task={this.props.task}
            disabled={this.props.disabled}
            disable={this.props.disable}
            completeTask={this.props.completeTask}
          />
        </div>
        <div className='col-md-6'>
          <PostponeButton
            task={this.props.task}
            loadTask={this.props.loadTask}
            disabled={this.props.disabled}
            disable={this.props.disable}
            storePostponeSeconds={this.props.storePostponeSeconds}
            postponeSeconds={this.props.postponeSeconds}
            postponeTask={this.props.postponeTask}
          />
        </div>
      </div>
    );
  }
});

module.exports = MainButtons;
