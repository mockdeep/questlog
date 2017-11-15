import {connect} from 'react-redux';

import TimeframeListView from 'src/timeframe/components/list_view';
import {deleteTask, fetchTasks, updateTask} from 'src/task/action_creators';

function mapStateToProps() {
  return {};
}

const actionCreators = {deleteTask, fetchTasks, updateTask};

export default connect(mapStateToProps, actionCreators)(TimeframeListView);
