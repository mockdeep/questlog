import React from 'react';

type Props = {
  content: string,
  value: string,
};

function SelectOption({content, value}: Props) {
  return <option value={value}>{content}</option>;
}

export default SelectOption;
