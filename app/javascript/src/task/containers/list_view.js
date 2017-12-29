import {connect} from 'react-redux';

import TaskListView from 'src/task/components/list_view';
import {deleteTask, updateTask} from 'src/task/action_creators';
import {getPartitionedTasks} from 'src/task/selectors';

function mapStateToProps(state) {
  const {pending, undone} = getPartitionedTasks(state);

  return {currentTasks: undone, pendingTasks: pending};
}

export default connect(mapStateToProps, {deleteTask, updateTask})(TaskListView);
