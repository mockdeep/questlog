import PropTypes from 'prop-types';
import React from 'react';

function SelectOption(props) {
  return <option value={props.value}>{props.content}</option>;
}

SelectOption.propTypes = {
  content: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default SelectOption;
