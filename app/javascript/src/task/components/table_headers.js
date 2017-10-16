import PropTypes from 'prop-types';
import React from 'react';

function TableHeaders({label}) {
  return (
    <tr className='task-list__header-row'>
      <th className='task-list__header' />
      <th className='task-list__header'>{`${label} tasks`}</th>
      <th className='task-list__header'>{'Estimate'}</th>
      <th className='task-list__header' />
      <th className='task-list__header'>{'Priority'}</th>
      <th className='task-list__header' />
      <th className='task-list__header' />
    </tr>
  );
}

TableHeaders.propTypes = {label: PropTypes.string.isRequired};

export default TableHeaders;
