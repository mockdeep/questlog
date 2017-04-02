import {connect} from 'react-redux';

import TimeframeList from 'js/timeframe/components/list';
import {deleteTask} from 'js/task/action_creators';

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, {deleteTask})(TimeframeList);
