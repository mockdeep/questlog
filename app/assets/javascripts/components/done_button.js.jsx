/** @jsx React.DOM */

(function () {
  'use strict';

  Questlog.DoneButton = React.createClass({

    reloadPage: function () {
      window.location.reload();
    },

    logError: function (error) {
      console.log(error);
    },

    markDone: function () {
      reqwest({
        url: 'tasks/' + this.props.id,
        data: { task: { done: true } },
        type: 'json',
        method: 'put',
        headers: {
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        success: this.reloadPage,
        error: this.logError
      });
    },

    render: function () {
      return (
        <input type='button' className='btn btn-primary btn-large btn-block' onClick={this.markDone} value='Done! Give me another!' />
      );
    }

  });

})();
