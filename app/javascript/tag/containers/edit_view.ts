import {connect} from "react-redux";
import TagEditView from "../components/edit_view";
import {getSelectedTag} from "../selectors";

function mapStateToProps(state: State) {
  return {tag: getSelectedTag(state)};
}

export default connect(mapStateToProps)(TagEditView);
