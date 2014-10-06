/** @jsx React.DOM */

(function () {
  'use strict';

  Questlog.DoneButton = React.createClass({
    markDone: function () {
      Questlog.request({
        url: 'tasks/' + this.props.id,
        data: { task: { done: true } },
      });
    },

    render: function () {
      return (
        <input type='button' className='btn btn-primary btn-large btn-block' onClick={this.markDone} value='Done! Give me another!' />
      );
    }
  });

})();
