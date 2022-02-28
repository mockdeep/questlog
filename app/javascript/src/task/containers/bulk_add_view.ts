import {connect} from 'react-redux';

import TaskBulkAddView from 'src/task/components/bulk_add_view';
import {updateTaskMeta} from 'src/task/action_creators';

function mapStateToProps(state: State) {
  return {taskTitles: state.task.meta.newTask.title};
}

const actionCreators = {updateTaskMeta};

export default connect(mapStateToProps, actionCreators)(TaskBulkAddView);
