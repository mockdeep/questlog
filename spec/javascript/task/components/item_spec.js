import React from 'react';
import {shallow} from 'enzyme';

import ItemContainer from 'src/task/components/item';
import NotificationCheckbox from 'src/notification/containers/checkbox';

const enableNotifications = jest.fn();
const disableNotifications = jest.fn();
let itemContainer;

beforeEach(() => {
  itemContainer = shallow(
    <ItemContainer
      match={{}}
      params={{}}
      notificationsEnabled={false}
      notificationsPermitted={true}
      enableNotifications={enableNotifications}
      disableNotifications={disableNotifications}
      deleteTask={jest.fn()}
      fetchTasks={jest.fn()}
      postponeSeconds={250}
      tags={[]}
      updateTag={jest.fn()}
      updateTaskMeta={jest.fn()}
    />
  );
});

describe('ItemContainer', () => {
  it('renders the notification checkbox', () => {
    expect(itemContainer.find(NotificationCheckbox)).toHaveLength(1);
  });
});
