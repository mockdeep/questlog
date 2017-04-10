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
      params={{}}
      notificationsEnabled={false}
      notificationsPermitted={true}
      enableNotifications={enableNotifications}
      disableNotifications={disableNotifications}
      deleteTask={jest.fn()}
      fetchTasks={jest.fn()}
      tags={[]}
    />
  );
});

describe('ItemContainer', () => {
  it('renders the notification checkbox', () => {
    expect(itemContainer.find(NotificationCheckbox)).toHaveLength(1);
  });
});
