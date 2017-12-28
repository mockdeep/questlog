import PropTypes from 'prop-types';
import React from 'react';

function errorItems(errors) {
  return errors.map(function errorItem(errorMessage) {
    return (
      <li key={errorMessage}>
        {errorMessage}
      </li>
    );
  });
}

function ErrorDisplay({errors}) {
  return (
    <div className='row'>
      <div className='col-md-12'>
        <div className='error-messages'>
          <ul>
            {errorItems(errors)}
          </ul>
        </div>
      </div>
    </div>
  );
}

ErrorDisplay.propTypes = {errors: PropTypes.arrayOf(PropTypes.string).isRequired};

export default ErrorDisplay;
