import {connect} from "react-redux";

import TaskShowView from "../components/show_view";
import {deleteTask, updateTask} from "../action_creators";
import {getCurrentSubTasks, getCurrentTask} from "../selectors";

function mapStateToProps(state: State) {
  return {subTasks: getCurrentSubTasks(state), task: getCurrentTask(state)};
}

const actionCreators = {deleteTask, updateTask};

export default connect(mapStateToProps, actionCreators)(TaskShowView);
