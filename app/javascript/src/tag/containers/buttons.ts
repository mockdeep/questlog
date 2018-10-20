import {connect} from 'react-redux';

import {getActiveTags} from 'src/tag/selectors';
import TagButtons from 'src/tag/components/buttons';

type Props = {
  currentTagIds: number[];
};

function mapStateToProps(state: State, ownProps: Props) {
  return {
    currentTagIds: ownProps.currentTagIds || [],
    selectedTagSlug: state.route.params.slug,
    tags: getActiveTags(state),
  };
}

export default connect(mapStateToProps)(TagButtons);
