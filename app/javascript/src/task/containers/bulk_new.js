import {connect} from 'react-redux';

import BulkTasksNew from 'src/task/components/bulk_new';
import {setRoute} from 'src/route/action_creators';

export default connect(null, {setRoute})(BulkTasksNew);
