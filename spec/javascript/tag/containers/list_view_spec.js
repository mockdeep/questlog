import React from 'react';
import {shallow} from 'enzyme';

import createAppStore from 'src/create_app_store';
import TagListViewContainer from 'src/tag/containers/list_view';

const props = {store: createAppStore()};

it('wraps the TagListView component', () => {
  const container = shallow(<TagListViewContainer {...props} />);

  expect(container.find('TagListView')).toBePresent();
});
