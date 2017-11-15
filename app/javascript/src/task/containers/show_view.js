import {connect} from 'react-redux';

import {getCurrentTask} from 'src/task/selectors';
import TaskShowView from 'src/task/components/show_view';

function mapStateToProps(state) {
  return {task: getCurrentTask(state)};
}

export default connect(mapStateToProps)(TaskShowView);
