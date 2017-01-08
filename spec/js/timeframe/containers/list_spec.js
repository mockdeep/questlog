'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import TimeframeList from 'js/timeframe/containers/list';

let timeframeList;

beforeEach(() => {
  timeframeList = TestUtils.renderIntoDocument(<TimeframeList />);
});

describe('TimeframeList', () => {
  it('renders a loading message before content has been loaded', () => {
    const domNode = ReactDOM.findDOMNode(timeframeList);

    expect(domNode.textContent).toBe('Loading Timeframes...');
  });

  it('renders the current median productivity when loaded', () => {
    const input = {timeframes: [], meta: {medianProductivity: 4456}};

    timeframeList.refs.child.updateTimeframes(input);
    const domNode = ReactDOM.findDOMNode(timeframeList);
    const expectedMessage = 'Median Productivity: 1 hour, 14 minutes per day';

    expect(domNode.textContent).toContain(expectedMessage);
  });

  it('renders the given timeframes for the user', () => {
    const timeframe = {
      name: 'inbox',
      title: 'Inbox',
      currentTasks: [{id: 5, title: 'do laundry'}],
      pendingTasks: []
    };
    const input = {timeframes: [timeframe], meta: {medianProductivity: 300}};

    timeframeList.refs.child.updateTimeframes(input);
    const domNode = ReactDOM.findDOMNode(timeframeList);

    expect(domNode.textContent).toContain('Inbox');
    expect(domNode.textContent).toContain('do laundry');
  });

  it('does not render empty timeframes', () => {
    const timeframe = {name: 'Inbox', currentTasks: [], pendingTasks: []};
    const input = {timeframes: [timeframe], meta: {medianProductivity: 300}};

    timeframeList.refs.child.updateTimeframes(input);
    const domNode = ReactDOM.findDOMNode(timeframeList);

    expect(domNode.textContent).not.toContain('Inbox');
  });
});
