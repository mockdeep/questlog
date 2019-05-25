import React from 'react';
import {shallow} from 'enzyme';

import TaskTitle from 'src/task/components/task_title';

import {makeTask} from '_test_helpers/factories';

const task = makeTask({});
const props = {deleteTask: jest.fn(), task};

it('renders an editable title form', () => {
  const component = shallow(<TaskTitle {...props} />);
  const editTitleForm =
    component.find('ConnectFunction[keyPrefix="focusView"]');

  expect(editTitleForm).toHaveProp('task', task);
});
