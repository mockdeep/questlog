import {connect} from 'react-redux';

import HelpLink from 'src/_common/components/help_link';
import {updateCommon} from 'src/_common/action_creators';

function mapStateToProps(state) {
  return {helpModalOpen: Boolean(state.common.helpModalOpen)};
}

export default connect(mapStateToProps, {updateCommon})(HelpLink);
