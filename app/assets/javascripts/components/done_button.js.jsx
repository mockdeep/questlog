/** @jsx React.DOM */

(function () {
  'use strict';

  Questlog.DoneButton = React.createClass({
    getInitialState: function () {
      return {
        buttonContent: 'Done! Give me another!',
      };
    },

    disableButton: function () {
      this.setState({disabled: true, buttonContent: 'Marking done...'});
    },

    updateButton: function () {
      this.setState({buttonContent: 'Success!'});
      Questlog.reloadPage();
    },

    markDone: function () {
      if (this.state.disabled) { return; }
      this.disableButton();
      Questlog.request({
        url: 'tasks/' + this.props.id,
        data: { task: { done: true } },
        success: this.updateButton,
      });
    },

    render: function () {
      return (
        <input type='button'
               disabled={this.state.disabled}
               className='btn btn-primary btn-large btn-block'
               onClick={this.markDone}
               value={this.state.buttonContent} />
      );
    }
  });

})();
