import PropTypes from 'prop-types';
import React from 'react';

function TableHeaders({label}) {
  return (
    <tr className='task-list__header-row'>
      <th />
      <th>{`${label} tasks`}</th>
      <th>{'Estimate'}</th>
      <th />
      <th>{'Priority'}</th>
      <th />
      <th />
    </tr>
  );
}

TableHeaders.propTypes = {label: PropTypes.string.isRequired};

export default TableHeaders;
