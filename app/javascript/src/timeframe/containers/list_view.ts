import {connect} from 'react-redux';

import TimeframeListView from 'src/timeframe/components/list_view';
import {deleteTask, fetchTasks, updateTask} from 'src/task/action_creators';

const actionCreators = {deleteTask, fetchTasks, updateTask};

export default connect(null, actionCreators)(TimeframeListView);
