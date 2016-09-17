'use strict';

const TestUtils = require('react-addons-test-utils');
const React = require('react');
const ReactDOM = require('react-dom');
const Route = require('react-router').Route;
const proxyquire = require('proxyquire');

function AppBase() { return <div>boogers</div>; }
const fakeRoutes = <Route path='/' component={AppBase} />;
const router = proxyquire('router', {'_config/routes': fakeRoutes});

describe('router', function () {
  it('renders routes', function () {
    const renderedRouter = TestUtils.renderIntoDocument(router);
    const domNode = ReactDOM.findDOMNode(renderedRouter);

    expect(domNode.textContent).to.eq('boogers');
  });
});
