import {connect} from "react-redux";

import TimeframeListView from "../components/list_view";
import {deleteTask, updateTask} from "../../task/action_creators";

const actionCreators = {deleteTask, updateTask};

export default connect(null, actionCreators)(TimeframeListView);
