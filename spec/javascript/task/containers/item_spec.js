import React from 'react';
import {createStore} from 'redux';
import {shallow} from 'enzyme';

import ItemComponent from 'src/task/components/item';
import ItemContainer from 'src/task/containers/item';

const tagState = {orderedIds: []};
const taskState = {meta: {postponeSeconds: 5}};
const props = {
  match: {params: {}},
  store: createStore(() => ({tag: tagState, task: taskState})),
};

it('wraps the Item component', () => {
  const container = shallow(<ItemContainer {...props} />);

  expect(container.find(ItemComponent)).toHaveLength(1);
});
