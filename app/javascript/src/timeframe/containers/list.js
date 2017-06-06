import {connect} from 'react-redux';

import TimeframeList from 'src/timeframe/components/list';
import {deleteTask, fetchTasks, updateTask} from 'src/task/action_creators';

function mapStateToProps() {
  return {};
}

const actionCreators = {deleteTask, fetchTasks, updateTask};

export default connect(mapStateToProps, actionCreators)(TimeframeList);
