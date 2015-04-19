(function () {
  'use strict';

  var DoneButton = require('../components/done_button');
  var PostponeButton = require('../components/postpone_button');

  Questlog.MainButtons = React.createClass({
    render: function () {
      return (
        <div id='buttons' className='row main-button'>
          <div className='col-md-6'>
            <DoneButton
              task={this.props.task}
              loadTask={this.props.loadTask}
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
            />
          </div>
        </div>
      );
    }
  });
})();
