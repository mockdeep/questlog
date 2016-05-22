'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

const TimeframesIndex = require('containers/timeframes/index');

let timeframesIndex;

beforeEach(function () {
  timeframesIndex = TestUtils.renderIntoDocument(<TimeframesIndex />);
});

describe('TimeframesIndex', function () {
  it('renders a loading message before content has been loaded', function () {
    const domNode = ReactDOM.findDOMNode(timeframesIndex);

    expect(domNode.textContent).to.equal('Loading Timeframes...');
  });

  it('renders the current median productivity when loaded', function () {
    const input = {timeframes: [], meta: {medianProductivity: 4456}};

    timeframesIndex.refs.child.updateTimeframes(input);
    const domNode = ReactDOM.findDOMNode(timeframesIndex);
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

    timeframesIndex.refs.child.updateTimeframes(input);
    const domNode = ReactDOM.findDOMNode(timeframesIndex);

    expect(domNode.textContent).to.contain('Inbox');
    expect(domNode.textContent).to.contain('do laundry');
  });

  it('does not render empty timeframes', function () {
    const timeframe = {name: 'Inbox', currentTasks: [], pendingTasks: []};
    const input = {timeframes: [timeframe], meta: {medianProductivity: 300}};

    timeframesIndex.refs.child.updateTimeframes(input);
    const domNode = ReactDOM.findDOMNode(timeframesIndex);

    expect(domNode.textContent).not.to.contain('Inbox');
  });
});
