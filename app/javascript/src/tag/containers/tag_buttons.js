import {connect} from 'react-redux';

import {getActiveTags} from 'src/tag/selectors';
import TagButtons from 'src/tag/components/tag_buttons';

function mapStateToProps(state, ownProps) {
  return {
    activeTagSlug: state.route.params.slug,
    currentTagIds: ownProps.currentTagIds || [],
    tags: getActiveTags(state),
  };
}

export default connect(mapStateToProps)(TagButtons);
