import PropTypes from 'prop-types';
import React from 'react';

type Props = {
  content: string,
  value: string,
};

function SelectOption({content, value}: Props) {
  return <option value={value}>{content}</option>;
}

SelectOption.propTypes = {
  content: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default SelectOption;
