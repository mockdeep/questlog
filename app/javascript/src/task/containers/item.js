import {connect} from 'react-redux';

import {deleteTask, updateTask, updateTaskMeta} from 'src/task/action_creators';
import {getActiveTags} from 'src/tag/selectors';
import {getNextUndoneTask} from 'src/task/selectors';
import {updateTagMeta} from 'src/tag/action_creators';
import TaskItem from 'src/task/components/item';

function mapStateToProps(state) {
  return {
    tags: getActiveTags(state),
    task: getNextUndoneTask(state),
    postponeSeconds: state.task.meta.postponeSeconds,
    ajaxState: state.task.meta.ajaxState,
  };
}

const actionCreators = {deleteTask, updateTagMeta, updateTask, updateTaskMeta};

export default connect(mapStateToProps, actionCreators)(TaskItem);
