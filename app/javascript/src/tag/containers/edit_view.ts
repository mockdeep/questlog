import {connect} from 'react-redux';
import TagEditView from 'src/tag/components/edit_view';
import {getSelectedTag} from 'src/tag/selectors';

function mapStateToProps(state: State) {
  return {tag: getSelectedTag(state)};
}

export default connect(mapStateToProps)(TagEditView);
