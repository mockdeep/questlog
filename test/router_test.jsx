'use strict';

const TestUtils = require('react-addons-test-utils');
const React = require('react');
const ReactDOM = require('react-dom');
const Route = require('react-router').Route;

import * as td from 'testdouble';

function AppBase() { return <div>boogers</div>; }
const fakeRoutes = <Route path='/' component={AppBase} />;

td.replace('_config/routes', fakeRoutes);

const router = require('router');

describe('router', function () {
  it('renders routes', function () {
    const renderedRouter = TestUtils.renderIntoDocument(router);
    const domNode = ReactDOM.findDOMNode(renderedRouter);

    expect(domNode.textContent).to.eq('boogers');
  });
});
