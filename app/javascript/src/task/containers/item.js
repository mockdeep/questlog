import {connect} from 'react-redux';

import {deleteTask, updateTask, updateTaskMeta} from 'src/task/action_creators';
import {getNextUndoneTask} from 'src/tag/selectors';
import TaskItem from 'src/task/components/item';

function mapStateToProps(state) {
  const {ajaxState, postponeSeconds} = state.task.meta;
  const task = ajaxState === 'ready' ? getNextUndoneTask(state) : null;

  return {task, postponeSeconds, ajaxState};
}

const actionCreators = {deleteTask, updateTask, updateTaskMeta};

export default connect(mapStateToProps, actionCreators)(TaskItem);
