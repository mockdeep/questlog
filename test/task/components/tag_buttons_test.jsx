'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

const TagButtons = require('task/components/tag_buttons');

const tags = [
  {id: 5, name: 'home', unfinished_tasks_count: 8},
  {id: 23, name: 'work', unfinished_tasks_count: 13}
];
const task = {};

let tagButtons;

beforeEach(function () {
  tagButtons = TestUtils.renderIntoDocument(<TagButtons task={task} tags={tags}/>);
});

describe('TagButtons', function () {
  it('renders some stuff', function () {
    const domNode = ReactDOM.findDOMNode(tagButtons);

    expect(domNode.textContent).to.contain('home (8)');
    expect(domNode.textContent).to.contain('work (13)');
  });
});
