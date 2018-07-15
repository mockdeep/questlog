import {connect} from 'react-redux';

import TagListView from 'src/tag/components/list_view';
import {getOrderedTags} from 'src/tag/selectors';

function mapStateToProps(state) {
  return {tags: getOrderedTags(state)};
}

export default connect(mapStateToProps)(TagListView);
