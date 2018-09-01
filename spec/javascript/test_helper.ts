import '_test_helpers/shims';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import FakeNotification from '_test_helpers/fake_notification';

Enzyme.configure({adapter: new Adapter()});

import 'whatwg-fetch';
import 'jest-enzyme';

declare global {
  interface Window {
    Notification: any;
  }
}

window.Notification = FakeNotification;

document.body.innerHTML = '<div id="app-base"></div>';

beforeEach(() => {
  expect.hasAssertions();
});
