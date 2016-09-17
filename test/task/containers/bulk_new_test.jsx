'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const proxyquire = require('proxyquire');

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
  pushState(something, path) {
    this.paths = this.paths || [];
    this.paths.push(path);
  }
};
const proxyArgs = {'task/bulk_store': FakeStore};
const BulkTasksNew = proxyquire('task/containers/bulk_new', proxyArgs);

let bulkTasksNew;

beforeEach(function () {
  bulkTasksNew = TestUtils.renderIntoDocument(<BulkTasksNew />);
  bulkTasksNew.history = fakeHistory;
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
