import {connect} from 'react-redux';

import Router from 'src/route/components/router';

function mapStateToProps(state: State) {
  return {route: state.route};
}

export default connect(mapStateToProps)(Router);
