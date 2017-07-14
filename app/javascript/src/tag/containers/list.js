import {connect} from 'react-redux';

import TagList from 'src/tag/components/list';
import {getOrderedTags} from 'src/tag/selectors';

function mapStateToProps(state) {
  return {tags: getOrderedTags(state)};
}

export default connect(mapStateToProps)(TagList);
