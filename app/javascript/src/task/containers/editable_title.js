import connectWithScratch from 'src/scratch/connect_with_scratch';
import TaskEditableTitle from 'src/task/components/editable_title';
import {updateTask} from 'src/task/action_creators';

function computeScratchKey(state, ownProps) {
  return `editTaskTitle-${ownProps.task.id}`;
}

function mapStateToProps(state, ownProps) {
  return {task: ownProps.task};
}

export default connectWithScratch(
  computeScratchKey,
  mapStateToProps,
  {updateTask}
)(TaskEditableTitle);
