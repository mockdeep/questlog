import React from 'react';

import DoneButton from 'js/task/components/done_button';
import PostponeButton from 'js/task/components/postpone_button';

function MainButtons(props) {
  return (
    <div id='buttons' className='row main-button'>
      <div className='col-md-6'>
        <DoneButton
          task={props.task}
          disabled={props.disabled}
          disable={props.disable}
          completeTask={props.completeTask}
        />
      </div>
      <div className='col-md-6'>
        <PostponeButton
          task={props.task}
          disabled={props.disabled}
          disable={props.disable}
          storePostponeSeconds={props.storePostponeSeconds}
          postponeSeconds={props.postponeSeconds}
          postponeTask={props.postponeTask}
        />
      </div>
    </div>
  );
}

MainButtons.propTypes = {
  completeTask: React.PropTypes.func.isRequired,
  disable: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool.isRequired,
  postponeSeconds: React.PropTypes.number.isRequired,
  postponeTask: React.PropTypes.func.isRequired,
  storePostponeSeconds: React.PropTypes.func.isRequired,
  task: React.PropTypes.object.isRequired,
};

export default MainButtons;
