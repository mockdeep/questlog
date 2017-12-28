import PropTypes from 'prop-types';
import React from 'react';

function SelectOption({content, value}) {
  return (
    <option value={value}>
      {content}
    </option>
  );
}

SelectOption.propTypes = {
  content: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default SelectOption;
