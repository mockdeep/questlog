'use strict';

import React from 'react';

const ErrorDisplay = React.createClass({
  propTypes: {errors: React.PropTypes.array.isRequired},

  errorItems() {
    return this.props.errors.map(function errorItem(errorMessage) {
      return <li key={errorMessage}>{errorMessage}</li>;
    });
  },

  render() {
    return (
      <div className='row'>
        <div className='col-md-12'>
          <div className='.error-messages'>
            <ul>{this.errorItems()}</ul>
          </div>
        </div>
      </div>
    );
  },
});

export default ErrorDisplay;
