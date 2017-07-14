import React from 'react';
import {shallow} from 'enzyme';

import TagEditFormContainer from 'src/tag/containers/edit_form';
import store from 'src/app_store';

const renderOpts = {lifecycleExperimental: true};
const props = {store};

it('wraps the EditForm component', () => {
  const container = shallow(<TagEditFormContainer {...props} />, renderOpts);

  expect(container.find('EditTagForm')).toHaveLength(1);
});
