import {connect} from 'react-redux';
import {deleteTask, updateTask, updateTaskMeta} from 'src/task/action_creators';
import {getNextActiveTask} from 'src/tag/selectors';
import TaskFocusView from 'src/task/components/focus_view';

function mapStateToProps(state: State) {
  const {ajaxState} = state.task.meta;
  const task = getNextActiveTask(state);

  return {task, ajaxState};
}

const actionCreators = {deleteTask, updateTask, updateTaskMeta};

export default connect(mapStateToProps, actionCreators)(TaskFocusView);
