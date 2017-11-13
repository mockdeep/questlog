import {connect} from 'react-redux';

import {getCurrentTask} from 'src/task/selectors';
import TaskShowScreen from 'src/task/components/show_screen';

function mapStateToProps(state) {
  return {task: getCurrentTask(state)};
}

export default connect(mapStateToProps)(TaskShowScreen);
