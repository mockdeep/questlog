/** @jsx React.DOM */

(function () {

  'use strict';

  Questlog.ErrorDisplay = React.createClass({
    errorItems: function () {
      console.log('rendering errors');
      console.log(this.props.errors);
      return _.map(this.props.errors, function (errorMessage) {
        return (<li key={errorMessage}>{errorMessage}</li>);
      });
    },

    render: function () {
      return (
        <div className='row-fluid'>
          <div className='span12'>
            <div className='.error_messages'>
              <ul>
                {this.errorItems()}
              </ul>
            </div>
          </div>
        </div>
      );
    }
  });

})();
