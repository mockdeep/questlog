import {connect} from 'react-redux';

import {createTask, setNewTask} from 'js/task/action_creators';
import NewTaskForm from 'js/task/components/new_task_form';

function mapStateToProps(state) {
  return {
    task: state.task.newTask,
    taskSaving: state.task.ajaxSate === 'taskSaving',
  };
}

export default connect(mapStateToProps, {createTask, setNewTask})(NewTaskForm);
