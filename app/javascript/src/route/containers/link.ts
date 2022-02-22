import {connect} from 'react-redux';

import Link from 'src/route/components/link';
import {getRouteName} from 'src/route/selectors';

function mapStateToProps(state: State) {
  return {routeName: getRouteName(state)};
}

export default connect(mapStateToProps)(Link);
