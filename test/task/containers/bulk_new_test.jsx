'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

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

const BulkTasksNew = require('task/containers/bulk_new');

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
