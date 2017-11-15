import {connect} from 'react-redux';

import TaskListView from 'src/task/components/list_view';
import {deleteTask, updateTask} from 'src/task/action_creators';

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, {deleteTask, updateTask})(TaskListView);
