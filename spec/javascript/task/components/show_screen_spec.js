import React from 'react';
import {shallow} from 'enzyme';

import TaskShowScreen from 'src/task/components/show_screen';

it('renders nothing when the task is not present', () => {
  const component = shallow(<TaskShowScreen />);

  expect(component.type()).toBeNull();
});

it('renders something when the task is present', () => {
  const task = {title: 'foo title', tagNames: []};

  const component = shallow(<TaskShowScreen task={task} />);

  expect(component.type()).not.toBeNull();
});

it('renders the task title', () => {
  const task = {title: 'foo title', tagNames: []};

  const component = shallow(<TaskShowScreen task={task} />);

  expect(component.find('h2')).toHaveText('foo title');
});

it('renders a message about the repeat time when present', () => {
  const task = {title: 'foo title', repeatSeconds: 3600, tagNames: []};

  const component = shallow(<TaskShowScreen task={task} />);

  expect(component).toIncludeText('Repeat: every 1 hour');
});

it('renders a message about no repeat time when not present', () => {
  const task = {title: 'foo title', tagNames: []};

  const component = shallow(<TaskShowScreen task={task} />);

  expect(component).toIncludeText('Repeat: never');
});

it('renders a message about the estimate when present', () => {
  const task = {title: 'foo title', estimateSeconds: 5200, tagNames: []};

  const component = shallow(<TaskShowScreen task={task} />);

  expect(component).toIncludeText('Estimate: 1 hour, 26 minutes');
});

it('renders a message about no estimate when not present', () => {
  const task = {title: 'foo title', tagNames: []};

  const component = shallow(<TaskShowScreen task={task} />);

  expect(component).toIncludeText('Estimate: none');
});

it('renders a message about the priority when present', () => {
  const task = {title: 'foo title', priority: 3, tagNames: []};

  const component = shallow(<TaskShowScreen task={task} />);

  expect(component).toIncludeText('Priority: 3');
});

it('renders a message about no priority when not present', () => {
  const task = {title: 'foo title', tagNames: []};

  const component = shallow(<TaskShowScreen task={task} />);

  expect(component).toIncludeText('Priority: none');
});

it('renders a message about associated tags when present', () => {
  const task = {title: 'foo title', tagNames: ['foo', 'bar', 'butz']};

  const component = shallow(<TaskShowScreen task={task} />);

  expect(component).toIncludeText('Tags: foo, bar, butz');
});

it('renders a message about no tags when not present', () => {
  const task = {title: 'foo title', tagNames: []};

  const component = shallow(<TaskShowScreen task={task} />);

  expect(component).toIncludeText('Tags: none');
});
