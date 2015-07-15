'use strict';

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var expect = require('chai').expect;

var componentPath = require('../helper').componentPath;

var TimeframesIndex = require(componentPath('components/timeframes/index'));
var timeframesIndex;

beforeEach(function () {
  timeframesIndex = TestUtils.renderIntoDocument(<TimeframesIndex />);
});

describe('TimeframesIndex', function () {
  it('renders a loading message before content has been loaded', function () {
    var domNode = timeframesIndex.getDOMNode();
    expect(domNode.textContent).to.equal('Loading Timeframes...');
  });

  it('renders the current median productivity when loaded', function () {
    var input = {timeframes: [], meta: {medianProductivity: 4456}};
    timeframesIndex.updateTimeframes(input);
    var domNode = timeframesIndex.getDOMNode();
    var expectedMessage = 'Median Productivity: 1 hour, 14 minutes per day';
    expect(domNode.textContent).to.contain(expectedMessage);
  });

  it('renders the given timeframes for the user', function () {
    var timeframe = {
      name: 'inbox',
      title: 'Inbox',
      currentTasks: [{id: 5, title: 'do laundry'}],
      pendingTasks: []
    };
    var input = {timeframes: [timeframe], meta: {medianProductivity: 300}};
    timeframesIndex.updateTimeframes(input);
    var domNode = timeframesIndex.getDOMNode();
    expect(domNode.textContent).to.contain('Inbox');
    expect(domNode.textContent).to.contain('do laundry');
  });

  it('does not render empty timeframes', function () {
    var timeframe = {name: 'Inbox', currentTasks: [], pendingTasks: []};
    var input = {timeframes: [timeframe], meta: {medianProductivity: 300}};
    timeframesIndex.updateTimeframes(input);
    var domNode = timeframesIndex.getDOMNode();
    expect(domNode.textContent).not.to.contain('Inbox');
  });

});
