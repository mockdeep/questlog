'use strict';

const React = require('react');

const DoneButton = require('task/components/done_button');
const PostponeButton = require('task/components/postpone_button');

const MainButtons = React.createClass({
  propTypes: {
    completeTask: React.PropTypes.func.isRequired,
    disable: React.PropTypes.func.isRequired,
    disabled: React.PropTypes.bool.isRequired,
    loadTask: React.PropTypes.func.isRequired,
    postponeSeconds: React.PropTypes.number.isRequired,
    postponeTask: React.PropTypes.func.isRequired,
    storePostponeSeconds: React.PropTypes.func.isRequired,
    task: React.PropTypes.object.isRequired
  },

  render() {
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
