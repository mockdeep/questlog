/** @jsx React.DOM */

(function () {

  'use strict';

  Questlog.MainButtons = React.createClass({
    getInitialState: function () {
      return {disabled: false};
    },
    disable: function () {
      this.setState({disabled: true});
    },
    render: function () {
      return (
        <div id='buttons' className='row-fluid'>
          <div className='span6'>
            <Questlog.DoneButton task={this.props.task} disabled={this.state.disabled} disable={this.disable} />
          </div>
          <div className='span6'>
            <Questlog.PostponeButton task={this.props.task} disabled={this.state.disabled} disable={this.disable} />
          </div>
        </div>
      );
    }
  });

})();
