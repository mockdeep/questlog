import {connect} from 'react-redux';

import {createTask, updateTaskMeta} from 'src/task/action_creators';
import NewTaskForm from 'src/task/components/new_task_form';

function mapStateToProps(state) {
  return {
    task: state.task.meta.newTask,
    taskSaving: state.task.ajaxState === 'taskSaving',
  };
}

const actionCreators = {createTask, updateTaskMeta};

export default connect(mapStateToProps, actionCreators)(NewTaskForm);
