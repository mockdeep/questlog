import connectWithScratch from 'src/scratch/connect_with_scratch';
import TagEditView from 'src/tag/components/edit_view';
import {getSelectedTag} from 'src/tag/selectors';
import {setRoute} from 'src/route/action_creators';
import {updateTag} from 'src/tag/action_creators';

function computeScratchKey(state: State) {
  const tag = getSelectedTag(state);

  return tag ? `editTag-${tag.slug}` : 'editTag-loading';
}

function mapStateToProps(state: State) {
  return {tag: getSelectedTag(state)};
}

const actionCreators = {setRoute, updateTag};

export default connectWithScratch(
  computeScratchKey,
  mapStateToProps,
  actionCreators,
)(TagEditView);
