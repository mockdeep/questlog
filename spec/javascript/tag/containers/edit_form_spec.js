import React from 'react';
import {shallow} from 'enzyme';

import TagEditFormContainer from 'src/tag/containers/edit_form';
import createAppStore from 'src/create_app_store';

const props = {store: createAppStore()};

it('wraps the EditForm component', () => {
  const container = shallow(<TagEditFormContainer {...props} />);

  expect(container.find('Scratch(EditTagForm)')).toBePresent();
});
