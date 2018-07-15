import {connect} from 'react-redux';

import TaskShowView from 'src/task/components/show_view';
import {deleteTask, updateTask, updateTaskMeta} from 'src/task/action_creators';
import {getCurrentSubTasks, getCurrentTask} from 'src/task/selectors';

function mapStateToProps(state) {
  return {subTasks: getCurrentSubTasks(state), task: getCurrentTask(state)};
}

const actionCreators = {deleteTask, updateTask, updateTaskMeta};

export default connect(mapStateToProps, actionCreators)(TaskShowView);
