import {connect} from 'react-redux';

import TaskBulkAddView from 'src/task/components/bulk_add_view';
import {setRoute} from 'src/route/action_creators';
import {updateTaskMeta} from 'src/task/action_creators';

function mapStateToProps(state) {
  return {taskTitles: state.task.meta.newTask.title};
}

const actionCreators = {setRoute, updateTaskMeta};

export default connect(mapStateToProps, actionCreators)(TaskBulkAddView);
