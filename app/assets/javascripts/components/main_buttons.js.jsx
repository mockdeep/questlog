(function () {

  'use strict';

  Questlog.MainButtons = React.createClass({
    render: function () {
      return (
        <div id='buttons' className='row main-button'>
          <div className='col-md-6'>
            <Questlog.DoneButton
              task={this.props.task}
              loadTask={this.props.loadTask}
              disabled={this.props.disabled}
              disable={this.props.disable}
            />
          </div>
          <div className='col-md-6'>
            <Questlog.PostponeButton
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
