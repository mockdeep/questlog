import React from 'react';
import {shallow} from 'enzyme';

import TimeframeListView from 'src/timeframe/components/list_view';

const props = {
  deleteTask: jest.fn(),
  fetchTasks: jest.fn(),
  updateTask: jest.fn(),
};

it('renders a loading message before content has been loaded', () => {
  const component = shallow(<TimeframeListView {...props} />);

  expect(component).toHaveText('Loading Timeframes...');
});

it('renders the current median productivity when loaded', () => {
  const input = {timeframes: [], meta: {medianProductivity: 4456}};

  const component = shallow(<TimeframeListView {...props} />);
  component.instance().updateTimeframes(input);
  component.update();

  const expectedMessage = 'Median Productivity: 1 hour, 14 minutes per day';

  expect(component).toIncludeText(expectedMessage);
});

it('renders the given timeframes for the user', () => {
  const timeframe = {
    name: 'inbox',
    title: 'Inbox',
    currentTasks: [{id: 5, title: 'do laundry'}],
    pendingTasks: [],
  };
  const input = {timeframes: [timeframe], meta: {medianProductivity: 300}};

  const component = shallow(<TimeframeListView {...props} />);
  component.instance().updateTimeframes(input);
  component.update();

  expect(component.find('TimeframeSection')).toHaveProp('timeframe', timeframe);
});

it('does not render empty timeframes', () => {
  const timeframe = {name: 'Inbox', currentTasks: [], pendingTasks: []};
  const input = {timeframes: [timeframe], meta: {medianProductivity: 300}};

  const component = shallow(<TimeframeListView {...props} />);
  component.instance().updateTimeframes(input);
  component.update();

  expect(component.find('TimeframeSection')).not.toExist();
});
