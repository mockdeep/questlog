import React from 'react';
import {shallow} from 'enzyme';

import TagEditFormContainer from 'src/tag/containers/edit_form';
import createAppStore from 'src/create_app_store';

const renderOpts = {lifecycleExperimental: true};
const props = {store: createAppStore()};

it('wraps the EditForm component', () => {
  const container = shallow(<TagEditFormContainer {...props} />, renderOpts);

  expect(container.find('Scratch(EditTagForm)')).toHaveLength(1);
});
