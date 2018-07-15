import {connect} from 'react-redux';

import Link from 'src/route/components/link';
import {getRouteName} from 'src/route/selectors';
import {setRoute} from 'src/route/action_creators';

function mapStateToProps(state) {
  return {routeName: getRouteName(state)};
}

export default connect(mapStateToProps, {setRoute})(Link);
