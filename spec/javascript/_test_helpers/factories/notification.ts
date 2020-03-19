import FakeNotification from '_test_helpers/fake_notification';
import {nextId} from '_test_helpers/factories/id';

function makeNotificationState(): NotificationState {
  return {
    currentTask: new FakeNotification(`fake notification ${nextId()}`),
  };
}

export {makeNotificationState};
