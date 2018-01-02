import {connect} from 'react-redux';

import TaskListView from 'src/task/components/list_view';
import {deleteTask, updateTask} from 'src/task/action_creators';
import {getPartitionedTasksForRoute} from 'src/task/selectors';

function mapStateToProps(state) {
  const {pending, undone} = getPartitionedTasksForRoute(state);

  return {currentTasks: undone, pendingTasks: pending, route: state.route};
}

export default connect(mapStateToProps, {deleteTask, updateTask})(TaskListView);
