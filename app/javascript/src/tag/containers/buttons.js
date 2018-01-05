import {connect} from 'react-redux';

import {getActiveTags, getTagMetaInfo} from 'src/tag/selectors';
import TagButtons from 'src/tag/components/buttons';

function mapStateToProps(state, ownProps) {
  return {
    currentTagIds: ownProps.currentTagIds || [],
    selectedTagSlug: state.route.params.slug,
    tags: getActiveTags(state),
    tagMetaInfo: getTagMetaInfo(state),
  };
}

export default connect(mapStateToProps)(TagButtons);
