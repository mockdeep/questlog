import PropTypes from 'prop-types';
import React from 'react';

import DoneButton from 'src/task/components/done_button';
import PostponeButton from 'src/task/components/postpone_button';
import {taskShape} from 'src/shapes';

function MainButtons({
  completeTask,
  disabled,
  postponeTask,
  storePostponeSeconds,
  task,
}) {
  return (
    <div id='buttons' className='row main-button'>
      <div className='col-md-6'>
        <DoneButton
          task={task}
          disabled={disabled}
          completeTask={completeTask}
        />
      </div>
      <div className='col-md-6'>
        <PostponeButton
          task={task}
          disabled={disabled}
          storePostponeSeconds={storePostponeSeconds}
          postponeTask={postponeTask}
        />
      </div>
    </div>
  );
}

MainButtons.propTypes = {
  completeTask: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  postponeTask: PropTypes.func.isRequired,
  storePostponeSeconds: PropTypes.func.isRequired,
  task: taskShape.isRequired,
};

export default MainButtons;
