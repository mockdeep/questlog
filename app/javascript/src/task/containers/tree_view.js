import {connect} from 'react-redux';

import TaskTreeView from 'src/task/components/tree_view';
import {deleteTask, updateTask} from 'src/task/action_creators';
import {getPartitionedRootTasks, getTasksByParentId} from 'src/task/selectors';

function mapStateToProps(state) {
  return {
    tasks: getPartitionedRootTasks(state).undone,
    tasksByParentId: getTasksByParentId(state),
  };
}

export default connect(mapStateToProps, {deleteTask, updateTask})(TaskTreeView);
