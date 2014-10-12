/** @jsx React.DOM */

(function () {

  'use strict';

  Questlog.MainButtons = React.createClass({
    render: function () {
      return (
        <div id='buttons' className='row-fluid'>
          <div className='span6'>
            <Questlog.DoneButton id={this.props.id}/>
          </div>
          <div className='span6'>
            <Questlog.PostponeButton id={this.props.id}/>
          </div>
        </div>
      );
    }
  });

})();
