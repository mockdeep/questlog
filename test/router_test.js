'use strict';

import TestUtils from 'react-addons-test-utils';
import React from 'react';
import ReactDOM from 'react-dom';
import {Route} from 'react-router';
import * as td from 'testdouble';

function AppBase() { return <div>boogers</div>; }
const fakeRoutes = <Route path='/' component={AppBase} />;

td.replace('js/_config/routes', fakeRoutes);

// this should change to `import` if/when td fixes this issue:
// https://github.com/testdouble/testdouble.js/issues/147
const router = require('js/router').default;

describe('router', function () {
  it('renders routes', function () {
    const renderedRouter = TestUtils.renderIntoDocument(router);
    const domNode = ReactDOM.findDOMNode(renderedRouter);

    expect(domNode.textContent).to.eq('boogers');
  });
});
