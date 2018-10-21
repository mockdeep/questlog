import {connect} from 'react-redux';

import {createTask, updateTaskMeta} from 'src/task/action_creators';
import NewTaskForm from 'src/task/components/new_task_form';

function mapStateToProps(state: State) {
  return {
    task: state.task.meta.newTask,
    taskSaving: state.task.meta.ajaxState === 'taskSaving',
  };
}

const actionCreators = {createTask, updateTaskMeta};

export default connect(mapStateToProps, actionCreators)(NewTaskForm);
