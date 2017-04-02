import {connect} from 'react-redux';

import TimeframeList from 'js/timeframe/components/list';
import {deleteTask, updateTask} from 'js/task/action_creators';

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, {deleteTask, updateTask})(TimeframeList);
