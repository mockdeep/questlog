import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {createTask, setNewTask} from 'js/task/action_creators';
import NewTaskForm from 'js/task/components/new_task_form';

function mapStateToProps(state) {
  return {
    task: state.task.newTask,
    taskSaving: state.task.ajaxSate === 'taskSaving',
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({createTask, setNewTask}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTaskForm);
