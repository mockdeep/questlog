import PropTypes from 'prop-types';
import React from 'react';

function ErrorDisplay({errors}) {
  return (
    <div className='row'>
      <div className='col-md-12'>
        <div className='error-messages'>
          <ul>
            {errors.map((error) => <li key={error}>{error}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

ErrorDisplay.propTypes = {errors: PropTypes.arrayOf(PropTypes.string).isRequired};

export default ErrorDisplay;
