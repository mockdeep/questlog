import {connect} from 'react-redux';

import {deleteTask, fetchTasks, updateTask} from 'src/task/action_creators';
import {getActiveTags} from 'src/tag/selectors';
import TaskItem from 'src/task/components/item';

function mapStateToProps(state) {
  return {tags: getActiveTags(state)};
}

const actionCreators = {deleteTask, fetchTasks, updateTask};

export default connect(mapStateToProps, actionCreators)(TaskItem);
