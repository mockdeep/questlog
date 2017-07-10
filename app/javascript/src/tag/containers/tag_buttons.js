import {connect} from 'react-redux';

import {getActiveTags} from 'src/tag/selectors';
import TagButtons from 'src/tag/components/tag_buttons';

function mapStateToProps(state) {
  return {
    activeTagSlug: state.route.params.slug,
    tags: getActiveTags(state),
  };
}

export default connect(mapStateToProps)(TagButtons);
