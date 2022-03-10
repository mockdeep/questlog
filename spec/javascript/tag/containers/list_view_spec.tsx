import React from 'react';
import {Provider} from 'react-redux';
import {mount} from 'enzyme';

import createAppStore from 'src/create_app_store';
import TagListViewContainer from 'src/tag/containers/list_view';

it('wraps the TagListView component', () => {
  const container = mount(
    <Provider store={createAppStore()}><TagListViewContainer /></Provider>,
  );

  expect(container.find('TagListView')).toExist();
});
