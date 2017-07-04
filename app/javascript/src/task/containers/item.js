import {connect} from 'react-redux';

import {deleteTask, updateTask, updateTaskMeta} from 'src/task/action_creators';
import {getActiveTags, getNextUndoneTask} from 'src/tag/selectors';
import {updateTagMeta} from 'src/tag/action_creators';
import TaskItem from 'src/task/components/item';

function mapStateToProps(state, ownProps) {
  const {ajaxState, postponeSeconds} = state.task.meta;
  const task = ajaxState === 'ready' ? getNextUndoneTask(state) : null;

  return {
    activeTagSlug: ownProps.match.params.slug,
    tags: getActiveTags(state),
    task,
    postponeSeconds,
    ajaxState,
  };
}

const actionCreators = {deleteTask, updateTagMeta, updateTask, updateTaskMeta};

export default connect(mapStateToProps, actionCreators)(TaskItem);
