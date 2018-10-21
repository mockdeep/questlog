import {connect} from 'react-redux';

import TaskTreeView from 'src/task/components/tree_view';
import {updateTask} from 'src/task/action_creators';
import {getPartitionedRootTasks, getTasksByParentId} from 'src/task/selectors';

function mapStateToProps(state: State) {
  return {
    tasks: getPartitionedRootTasks(state).active,
    tasksByParentId: getTasksByParentId(state),
  };
}

export default connect(mapStateToProps, {updateTask})(TaskTreeView);
