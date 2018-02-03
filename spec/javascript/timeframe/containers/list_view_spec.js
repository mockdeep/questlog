import React from 'react';
import {shallow} from 'enzyme';

import createAppStore from 'src/create_app_store';
import TimeframeListViewContainer from 'src/timeframe/containers/list_view';

it('wraps the TimeframeListView component', () => {
  const store = createAppStore();
  const container = shallow(<TimeframeListViewContainer store={store} />);

  expect(container.find('TimeframeListView')).toHaveLength(1);
});
