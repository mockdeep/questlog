import React from 'react';

function TaskFooter() {
  return (
    <footer className='task-footer'>
      <br />
      <a href='/bulk_task/new'>{'Add multiple tasks'}</a>
      {' | '}
      <a href='/help' data-turbo-frame='dialog' data-turbo='true'>
        {'Help'}
      </a>
      <br />
      {'Try adding a tag using "#", for example: '}
      <strong>{'#home'}</strong>{' or '}<strong>{'#5-min'}</strong>{'. '}
      {'Click '}
      <a href='/help' data-turbo-frame='dialog' data-turbo='true'>
        {'help'}
      </a>
      {' for more.'}
    </footer>
  );
}

export default TaskFooter;
