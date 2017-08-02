import connectWithScratch from 'src/scratch/connect_with_scratch';
import EditTagForm from 'src/tag/components/edit_form';
import {getSelectedTag} from 'src/tag/selectors';
import {setRoute} from 'src/route/action_creators';
import {updateTag} from 'src/tag/action_creators';

function computeScratchKey(state) {
  const tag = getSelectedTag(state);

  return tag ? `editTag-${tag.slug}` : 'editTag-loading';
}

function mapStateToProps(state) {
  return {
    tag: getSelectedTag(state),
    tempRules: state.tag.meta.tempRules,
  };
}

const actionCreators = {setRoute, updateTag};

export default connectWithScratch(
  computeScratchKey,
  mapStateToProps,
  actionCreators
)(EditTagForm);
