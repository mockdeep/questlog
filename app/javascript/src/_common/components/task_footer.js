import PropTypes from 'prop-types';
import React from 'react';

import Link from 'src/route/containers/link';
import HelpLink from 'src/_common/containers/help_link';
import NotificationCheckbox from 'src/notification/containers/checkbox';

function TaskFooter({task, completeTask}) {
  return (
    <footer className='task-footer'>
      <NotificationCheckbox task={task} completeTask={completeTask} />
      <br />
      <Link to='tasks'>{'All my tasks'}</Link>
      {' | '}
      <Link to='timeframes'>{'Timeframes'}</Link>
      {' | '}
      <a href='/bulk_task/new'>{'Add multiple tasks'}</a>
      {' | '}
      <HelpLink />
      <br />
      {'Try adding a tag using "#", for example: '}
      <strong>{'#home'}</strong>{' or '}<strong>{'#5-min'}</strong>{'. '}
      {'Click '}<HelpLink />{' for more.'}
    </footer>
  );
}

TaskFooter.propTypes = {
  completeTask: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
};

export default TaskFooter;
