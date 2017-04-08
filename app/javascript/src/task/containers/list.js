import {connect} from 'react-redux';

import TaskList from 'src/task/components/list';
import {deleteTask, updateTask} from 'src/task/action_creators';

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, {deleteTask, updateTask})(TaskList);
