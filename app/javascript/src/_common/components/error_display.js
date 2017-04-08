import React from 'react';

function errorItems(errors) {
  return errors.map(function errorItem(errorMessage) {
    return <li key={errorMessage}>{errorMessage}</li>;
  });
}

function ErrorDisplay(props) {
  return (
    <div className='row'>
      <div className='col-md-12'>
        <div className='.error-messages'>
          <ul>{errorItems(props.errors)}</ul>
        </div>
      </div>
    </div>
  );
}

ErrorDisplay.propTypes = {errors: React.PropTypes.array.isRequired};

export default ErrorDisplay;
