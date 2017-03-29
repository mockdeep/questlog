import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {setNewTask} from 'js/task/action_creators';
import NewTaskForm from 'js/task/components/new_task_form';

function mapStateToProps(state) {
  return {task: state.task.newTask};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({setNewTask}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTaskForm);
