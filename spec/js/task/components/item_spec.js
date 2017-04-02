import React from 'react';
import {shallow} from 'enzyme';

import ItemContainer from 'js/task/components/item';
import NotificationCheckbox from 'js/notification/components/checkbox';

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
    />
  );
});

describe('ItemContainer', () => {
  it('renders the notification checkbox', () => {
    expect(itemContainer.find(NotificationCheckbox)).toHaveLength(1);
  });
});
