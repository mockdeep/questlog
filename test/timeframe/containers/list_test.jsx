'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

const TimeframeList = require('timeframe/containers/list');

let timeframeList;

beforeEach(function () {
  timeframeList = TestUtils.renderIntoDocument(<TimeframeList />);
});

describe('TimeframeList', function () {
  it('renders a loading message before content has been loaded', function () {
    const domNode = ReactDOM.findDOMNode(timeframeList);

    expect(domNode.textContent).to.equal('Loading Timeframes...');
  });

  it('renders the current median productivity when loaded', function () {
    const input = {timeframes: [], meta: {medianProductivity: 4456}};

    timeframeList.refs.child.updateTimeframes(input);
    const domNode = ReactDOM.findDOMNode(timeframeList);
    const expectedMessage = 'Median Productivity: 1 hour, 14 minutes per day';

    expect(domNode.textContent).to.contain(expectedMessage);
  });

  it('renders the given timeframes for the user', function () {
    const timeframe = {
      name: 'inbox',
      title: 'Inbox',
      currentTasks: [{id: 5, title: 'do laundry'}],
      pendingTasks: []
    };
    const input = {timeframes: [timeframe], meta: {medianProductivity: 300}};

    timeframeList.refs.child.updateTimeframes(input);
    const domNode = ReactDOM.findDOMNode(timeframeList);

    expect(domNode.textContent).to.contain('Inbox');
    expect(domNode.textContent).to.contain('do laundry');
  });

  it('does not render empty timeframes', function () {
    const timeframe = {name: 'Inbox', currentTasks: [], pendingTasks: []};
    const input = {timeframes: [timeframe], meta: {medianProductivity: 300}};

    timeframeList.refs.child.updateTimeframes(input);
    const domNode = ReactDOM.findDOMNode(timeframeList);

    expect(domNode.textContent).not.to.contain('Inbox');
  });
});
