import React from 'react';
import {Provider} from 'react-redux';
import {mount} from 'enzyme';

import TagEditFormContainer from 'src/tag/containers/edit_view';
import createAppStore from 'src/create_app_store';

it('wraps the EditForm component', () => {
  const container = mount(
    <Provider store={createAppStore()}><TagEditFormContainer /></Provider>,
  );

  expect(container.find('TagEditView')).toExist();
});
