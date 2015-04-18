'use strict';

jest.dontMock(componentPath('DemoComponent'));

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var DemoComponent = require(componentPath('DemoComponent'));
var demoComponent;

beforeEach(function () {
  demoComponent = TestUtils.renderIntoDocument(<DemoComponent/>);
});

describe('DemoComponent', function() {
  it('should tell us it is a demo component', function() {
    expect(demoComponent.getDOMNode().textContent).toBe('Welcome to Demo Component!');
  });
});
