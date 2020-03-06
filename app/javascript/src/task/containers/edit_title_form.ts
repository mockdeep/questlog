import {connect} from 'react-redux';
import TaskEditTitleForm from 'src/task/components/edit_title_form';
import {updateTask} from 'src/task/action_creators';

type Props = {
  task: Task;
};

function mapStateToProps(state: State, ownProps: Props) {
  return {task: ownProps.task};
}

export default connect(mapStateToProps, {updateTask})(TaskEditTitleForm);
