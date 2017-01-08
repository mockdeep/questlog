'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {replace} from 'testdouble';

import fakeHistory from '_test_helpers/fake_history';
import FakeStore from '_test_helpers/fake_store';

replace('js/task/bulk_store', FakeStore);
replace('react-router', {browserHistory: fakeHistory});

// this should change to `import` if/when td fixes this issue:
// https://github.com/testdouble/testdouble.js/issues/147
const BulkTasksNew = require('js/task/containers/bulk_new').default;

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

    return FakeStore.createPromise.then(function () {
      expect(fakeHistory.paths).to.eql(['/tasks']);
    });
  });
});
