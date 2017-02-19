'use strict';

import React from 'react';
import {mount} from 'enzyme';

import TimeframeList from 'js/timeframe/containers/list';

let wrapper;

beforeEach(() => {
  wrapper = mount(<TimeframeList />);
});

describe('TimeframeList', () => {
  it('renders a loading message before content has been loaded', () => {
    expect(wrapper.text()).toBe('Loading Timeframes...');
  });

  it('renders the current median productivity when loaded', () => {
    const input = {timeframes: [], meta: {medianProductivity: 4456}};

    wrapper.instance().child.updateTimeframes(input);

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

    wrapper.instance().child.updateTimeframes(input);

    expect(wrapper.text()).toContain('Inbox');
    expect(wrapper.text()).toContain('do laundry');
  });

  it('does not render empty timeframes', () => {
    const timeframe = {name: 'Inbox', currentTasks: [], pendingTasks: []};
    const input = {timeframes: [timeframe], meta: {medianProductivity: 300}};

    wrapper.instance().child.updateTimeframes(input);

    expect(wrapper.text()).not.toContain('Inbox');
  });
});
