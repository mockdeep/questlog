'use strict';

var React = require('react');

var DoneButton = require('components/tasks/_done_button');
var PostponeButton = require('components/tasks/_postpone_button');

var MainButtons = React.createClass({
  propTypes: {
    postponeSeconds: React.PropTypes.number.isRequired
  },

  render: function () {
    return (
      <div id='buttons' className='row main-button'>
        <div className='col-md-6'>
          <DoneButton
            task={this.props.task}
            disabled={this.props.disabled}
            disable={this.props.disable}
          />
        </div>
        <div className='col-md-6'>
          <PostponeButton
            task={this.props.task}
            loadTask={this.props.loadTask}
            disabled={this.props.disabled}
            disable={this.props.disable}
            storeTask={this.props.storeTask}
            storePostponeSeconds={this.props.storePostponeSeconds}
            postponeSeconds={this.props.postponeSeconds}
          />
        </div>
      </div>
    );
  }
});

module.exports = MainButtons;
