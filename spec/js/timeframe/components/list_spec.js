import React from 'react';
import {shallow} from 'enzyme';

import TimeframeList from 'src/timeframe/components/list';
import TimeframeSection from 'src/timeframe/components/section';

let wrapper;

beforeEach(() => {
  const connector = shallow(
    <TimeframeList deleteTask={jest.fn()} updateTask={jest.fn()} />
  );

  wrapper = connector.first().shallow();
});

describe('TimeframeList', () => {
  it('renders a loading message before content has been loaded', () => {
    expect(wrapper.text()).toBe('Loading Timeframes...');
  });

  it('renders the current median productivity when loaded', () => {
    const input = {timeframes: [], meta: {medianProductivity: 4456}};

    wrapper.instance().updateTimeframes(input);

    const expectedMessage = 'Median Productivity: 1 hour, 14 minutes per day';

    expect(wrapper.text()).toContain(expectedMessage);
  });

  it('renders the given timeframes for the user', () => {
    const timeframe = {
      name: 'inbox',
      title: 'Inbox',
      currentTasks: [{id: 5, title: 'do laundry'}],
      pendingTasks: [],
    };
    const input = {timeframes: [timeframe], meta: {medianProductivity: 300}};

    wrapper.instance().updateTimeframes(input);

    expect(wrapper.find(TimeframeSection).prop('timeframe')).toBe(timeframe);
  });

  it('does not render empty timeframes', () => {
    const timeframe = {name: 'Inbox', currentTasks: [], pendingTasks: []};
    const input = {timeframes: [timeframe], meta: {medianProductivity: 300}};

    wrapper.instance().updateTimeframes(input);

    expect(wrapper.find(TimeframeSection).length).toBe(0);
  });
});
