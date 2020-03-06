import {connect} from 'react-redux';
import TagEditView from 'src/tag/components/edit_view';
import {getSelectedTag} from 'src/tag/selectors';
import {setRoute} from 'src/route/action_creators';
import {updateTag} from 'src/tag/action_creators';

function mapStateToProps(state: State) {
  return {tag: getSelectedTag(state)};
}

const actionCreators = {setRoute, updateTag};

export default connect(mapStateToProps, actionCreators)(TagEditView);
