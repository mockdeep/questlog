import React from 'react';
import {Link} from 'react-router';

import HelpLink from 'js/_common/components/help_link';

function TaskFooter() {
  return (
    <p>
      <Link to='/tasks'>{'All my tasks'}</Link>
      {' | '}
      <Link to='/timeframes'>{'Timeframes'}</Link>
      {' | '}
      <a href='/bulk_tasks/new'>{'Add multiple tasks'}</a>
      {' | '}
      <HelpLink />
      <br />
      {'Try adding a tag using "#", for example: '}
      <strong>{'#home'}</strong>{' or '}<strong>{'#5-min'}</strong>{'. '}
      {'Click '}<HelpLink />{' for more.'}
    </p>
  );
}

export default TaskFooter;
