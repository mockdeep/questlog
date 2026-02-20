import {connect} from "react-redux";

import {getActiveTags} from "../selectors";
import TagButtons from "../components/buttons";

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
