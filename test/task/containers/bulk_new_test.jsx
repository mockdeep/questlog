'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import * as td from 'testdouble';

let createPromise;
const FakeStore = {
  create() {
    createPromise = new Promise(function (resolve) {
      process.nextTick(function () {
        resolve();
      });
    });

    return createPromise;
  }
};
const fakeHistory = {
  reset() { this.paths = []; },
  push(path) {
    this.paths = this.paths || [];
    this.paths.push(path);
  }
};

td.replace('task/bulk_store', FakeStore);
td.replace('react-router', {browserHistory: fakeHistory});

// this should change to `import` if/when td fixes this issue:
// https://github.com/testdouble/testdouble.js/issues/147
const BulkTasksNew = require('task/containers/bulk_new').default;

let bulkTasksNew;

beforeEach(function () {
  bulkTasksNew = TestUtils.renderIntoDocument(<BulkTasksNew />);
});

afterEach(function () {
  fakeHistory.reset();
});

describe('BulkTasksNew', function () {
  it('redirects to TaskList on successful save', function () {
    bulkTasksNew.setState({taskTitles: 'foobutts'});
    const domNode = ReactDOM.findDOMNode(bulkTasksNew);

    TestUtils.Simulate.submit(domNode);

    expect(fakeHistory.paths).to.eql([]);

    return createPromise.then(function () {
      expect(fakeHistory.paths).to.eql(['/tasks']);
    });
  });
});
