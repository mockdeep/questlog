import {connect} from 'react-redux';

import grab from 'src/_helpers/grab';
import TaskListView from 'src/task/components/list_view';
import {deleteTask, updateTask} from 'src/task/action_creators';
import {
  getPartitionedTasks,
  getPartitionedLeafTasks,
  getPartitionedRootTasks,
} from 'src/task/selectors';

const ROUTE_SELECTORS = {
  tasks: getPartitionedTasks,
  rootTasks: getPartitionedRootTasks,
  leafTasks: getPartitionedLeafTasks,
};

function mapStateToProps(state) {
  const selector = grab(ROUTE_SELECTORS, state.route.name);
  const {pending, active} = selector(state);

  return {currentTasks: active, pendingTasks: pending, route: state.route};
}

export default connect(mapStateToProps, {deleteTask, updateTask})(TaskListView);
