import FakeNotification from "support/fake_notification";
import {nextId} from "support/factories/id";

function makeNotificationState(): NotificationState {
  return {
    currentTask: new FakeNotification(`fake notification ${nextId()}`),
  };
}

export {makeNotificationState};
