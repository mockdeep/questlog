import PropTypes from 'prop-types';
import React from 'react';

type Props = {label: string};

function TableHeaders({label}: Props) {
  return (
    <tr className='tasks-table__header-row'>
      <th className='tasks-table__header' />
      <th className='tasks-table__header'>{label}</th>
      <th className='tasks-table__header' />
      <th className='tasks-table__header'>{'Estimate'}</th>
      <th className='tasks-table__header' />
      <th className='tasks-table__header'>{'Priority'}</th>
      <th className='tasks-table__header' />
      <th className='tasks-table__header' />
    </tr>
  );
}

TableHeaders.propTypes = {label: PropTypes.string.isRequired};

export default TableHeaders;
