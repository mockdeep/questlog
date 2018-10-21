import connectWithScratch from 'src/scratch/connect_with_scratch';
import TaskEditTitleForm from 'src/task/components/edit_title_form';
import {updateTask} from 'src/task/action_creators';

type Props = {
  task: Task;
  keyPrefix: string;
};

function computeScratchKey(state: State, ownProps: Props) {
  return `${ownProps.keyPrefix}-editTaskTitle-${ownProps.task.id}`;
}

function mapStateToProps(state: State, ownProps: Props) {
  return {task: ownProps.task};
}

export default connectWithScratch(
  computeScratchKey,
  mapStateToProps,
  {updateTask}
)(TaskEditTitleForm);
