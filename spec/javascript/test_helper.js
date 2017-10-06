import '_test_helpers/shims';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import FakeNotification from '_test_helpers/fake_notification';

Enzyme.configure({adapter: new Adapter()});

import 'whatwg-fetch';
import 'jest-enzyme';
window.Notification = FakeNotification;
