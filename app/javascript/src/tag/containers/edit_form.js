import {connect} from 'react-redux';

import EditTagForm from 'src/tag/components/edit_form';
import {getSelectedTag} from 'src/tag/selectors';

function mapStateToProps(state) {
  return {tag: getSelectedTag(state)};
}

export default connect(mapStateToProps)(EditTagForm);
