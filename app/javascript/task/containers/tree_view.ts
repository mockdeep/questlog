import {connect} from "react-redux";

import TaskTreeView from "../components/tree_view";
import {updateTask} from "../action_creators";
import {getPartitionedRootTasks, getTasksByParentId} from "../selectors";

function mapStateToProps(state: State) {
  return {
    tasks: getPartitionedRootTasks(state).active,
    tasksByParentId: getTasksByParentId(state),
  };
}

export default connect(mapStateToProps, {updateTask})(TaskTreeView);
