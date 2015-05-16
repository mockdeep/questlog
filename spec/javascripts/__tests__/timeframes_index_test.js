'use strict';

jest.dontMock(componentPath('components/timeframes_index'));

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var TimeframesIndex = require(componentPath('components/timeframes_index'));
var timeframesIndex;

beforeEach(function () {
  timeframesIndex = TestUtils.renderIntoDocument(<TimeframesIndex />);
});

describe('TimeframesIndex', function () {
  it('renders a loading message before content has been loaded', function () {
    var domNode = timeframesIndex.getDOMNode();
    expect(domNode.textContent).toBe('Loading Timeframes...');
  });

  it('renders the current median productivity when loaded', function () {
    var input = {timeframes: [], meta: {medianProductivity: 4456}};
    timeframesIndex.updateTimeframes(input);
    var domNode = timeframesIndex.getDOMNode();
    var expectedMessage = 'Median Productivity: 1 hour, 14 minutes per day';
    expect(domNode.textContent).toBe(expectedMessage);
  });

  it('renders the given timeframes for the user', function () {
    var timeframe = {name: 'Inbox', tasks: [{id: 5, title: 'do laundry'}]};
    var input = {timeframes: [timeframe], meta: {medianProductivity: 300}};
    timeframesIndex.updateTimeframes(input);
    var domNode = timeframesIndex.getDOMNode();
    expect(domNode.textContent).toContain('Inbox');
    expect(domNode.textContent).toContain('do laundry');
  });

});
