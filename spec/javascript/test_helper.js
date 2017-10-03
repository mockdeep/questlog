import Adapter from 'enzyme-adapter-react-15';
import Enzyme from 'enzyme';
import FakeNotification from '_test_helpers/fake_notification';

Enzyme.configure({adapter: new Adapter()});
console.error = function error(message) { // eslint-disable-line no-console
  throw new Error(message);
};

import 'whatwg-fetch';
import 'jest-enzyme';
window.Notification = FakeNotification;
