import {connect} from "react-redux";

import TimeframeListView from "../components/list_view";
import {deleteTask, fetchTasks, updateTask} from "../../task/action_creators";

const actionCreators = {deleteTask, fetchTasks, updateTask};

export default connect(null, actionCreators)(TimeframeListView);
