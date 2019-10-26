import connectWithScratch from 'src/scratch/connect_with_scratch';
import {deleteTask, updateTask, updateTaskMeta} from 'src/task/action_creators';
import {getNextActiveTask} from 'src/tag/selectors';
import TaskFocusView from 'src/task/components/focus_view';

function computeScratchKey(state: State) {
  const {ajaxState} = state.task.meta;
  const task = ajaxState === 'ready' ? getNextActiveTask(state) : null;

  return task ? `taskItem-${task.id}` : 'taskItem-nada';
}

function mapStateToProps(state: State) {
  const {ajaxState} = state.task.meta;
  const task = ajaxState === 'ready' ? getNextActiveTask(state) : null;

  return {task, ajaxState};
}

const actionCreators = {deleteTask, updateTask, updateTaskMeta};

export default connectWithScratch(
  computeScratchKey,
  mapStateToProps,
  actionCreators,
)(TaskFocusView);
