import {connect} from 'react-redux';

import ModalLink from 'src/_common/components/modal_link';
import {updateCommon} from 'src/_common/action_creators';

function mapStateToProps(state: State) {
  return {openModalId: state.common.openModalId};
}

export default connect(mapStateToProps, {updateCommon})(ModalLink);
