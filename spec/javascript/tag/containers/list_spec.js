import React from 'react';
import {shallow} from 'enzyme';

import store from 'src/app_store';
import TagListContainer from 'src/tag/containers/list';

const renderOpts = {lifecycleExperimental: true};
const props = {store};

it('wraps the TagList component', () => {
  const container = shallow(<TagListContainer {...props} />, renderOpts);

  expect(container.find('TagList')).toHaveLength(1);
});
