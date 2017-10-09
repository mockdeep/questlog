import React from 'react';
import {shallow} from 'enzyme';

import createAppStore from 'src/create_app_store';
import TagListContainer from 'src/tag/containers/list';

const props = {store: createAppStore()};

it('wraps the TagList component', () => {
  const container = shallow(<TagListContainer {...props} />);

  expect(container.find('TagList')).toBePresent();
});
