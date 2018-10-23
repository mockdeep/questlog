import React from 'react';
import {shallow} from 'enzyme';

import createAppStore from 'src/create_app_store';
import TimeframeListViewContainer from 'src/timeframe/containers/list_view';

const props = {store: createAppStore()};
it('wraps the TimeframeListView component', () => {
  const container = shallow(<TimeframeListViewContainer {...props} />);

  expect(container.find('TimeframeListView')).toHaveLength(1);
});
