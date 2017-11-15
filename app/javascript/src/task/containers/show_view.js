import {connect} from 'react-redux';

import TaskShowView from 'src/task/components/show_view';
import {deleteTask, updateTask} from 'src/task/action_creators';
import {getCurrentTask} from 'src/task/selectors';

function mapStateToProps(state) {
  return {task: getCurrentTask(state)};
}

export default connect(mapStateToProps, {deleteTask, updateTask})(TaskShowView);
