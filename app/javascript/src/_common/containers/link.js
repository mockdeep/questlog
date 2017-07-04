import {connect} from 'react-redux';

import Link from 'src/_common/components/link';
import {setRoute} from 'src/route/action_creators';

export default connect(null, {setRoute})(Link);
