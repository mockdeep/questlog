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
});
