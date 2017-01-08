'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import TagButtons from 'js/task/components/tag_buttons';

const tags = [
  {id: 5, name: 'home', unfinished_tasks_count: 8},
  {id: 23, name: 'work', unfinished_tasks_count: 13}
];
const task = {};

let tagButtons;

beforeEach(() => {
  tagButtons = TestUtils.renderIntoDocument(<TagButtons task={task} tags={tags}/>);
});

describe('TagButtons', () => {
  it('renders some stuff', () => {
    const domNode = ReactDOM.findDOMNode(tagButtons);

    expect(domNode.textContent).toContain('home (8)');
    expect(domNode.textContent).toContain('work (13)');
  });
});
