import React from 'react';

const TABLE_HEADERS = (
  <thead>
    <tr className='tasks-table__header-row'>
      <th className='tasks-table__header' />
      <th className='tasks-table__header'>{'Title'}</th>
      <th className='tasks-table__header' />
      <th className='tasks-table__header'>{'Estimate'}</th>
      <th className='tasks-table__header' />
      <th className='tasks-table__header'>{'Priority'}</th>
      <th className='tasks-table__header'>{'Timeframe'}</th>
      <th className='tasks-table__header' />
    </tr>
  </thead>
);

function TableHeaders() {
  return TABLE_HEADERS;
}

export default TableHeaders;
