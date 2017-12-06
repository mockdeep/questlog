import PropTypes from 'prop-types';
import React from 'react';

import DoneButton from 'src/task/components/done_button';
import PostponeButton from 'src/task/components/postpone_button';
import {taskShape} from 'src/shapes';

function MainButtons(props) {
  return (
    <div id='buttons' className='row main-button'>
      <div className='col-md-6'>
        <DoneButton
          task={props.task}
          disabled={props.disabled}
          completeTask={props.completeTask}
        />
      </div>
      <div className='col-md-6'>
        <PostponeButton
          task={props.task}
          disabled={props.disabled}
          storePostponeSeconds={props.storePostponeSeconds}
          postponeTask={props.postponeTask}
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
