import connectWithScratch from 'src/scratch/connect_with_scratch';
import TaskEditTitleForm from 'src/task/components/edit_title_form';

function computeScratchKey() {
  return 'editTitleForm';
}

function mapStateToProps(state, ownProps) {
  return {saveTask: ownProps.saveTask, taskTitle: ownProps.taskTitle};
}

export default connectWithScratch(
  computeScratchKey,
  mapStateToProps,
  {}
)(TaskEditTitleForm);
