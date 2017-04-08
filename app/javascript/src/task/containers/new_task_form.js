import {connect} from 'react-redux';

import {createTask, setNewTask} from 'src/task/action_creators';
import NewTaskForm from 'src/task/components/new_task_form';

function mapStateToProps(state) {
  return {
    task: state.task.newTask,
    taskSaving: state.task.ajaxState === 'taskSaving',
  };
}

export default connect(mapStateToProps, {createTask, setNewTask})(NewTaskForm);
