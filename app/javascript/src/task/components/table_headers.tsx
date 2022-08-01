import React from 'react';
import type {ReactElement} from 'react';

type Props = {label: string};

function TableHeaders({label}: Props): ReactElement {
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

export default TableHeaders;
