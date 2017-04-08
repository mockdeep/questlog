import {connect} from 'react-redux';

import TimeframeList from 'src/timeframe/components/list';
import {deleteTask, updateTask} from 'src/task/action_creators';

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, {deleteTask, updateTask})(TimeframeList);
