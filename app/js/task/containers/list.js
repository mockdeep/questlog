import {connect} from 'react-redux';

import TaskList from 'js/task/components/list';
import {deleteTask, updateTask} from 'js/task/action_creators';

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, {deleteTask, updateTask})(TaskList);
