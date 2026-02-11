import '_test_helpers/shims';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import FakeNotification from '_test_helpers/fake_notification';

Enzyme.configure({adapter: new Adapter()});

const promise = new Promise(() => { /* noop */ });
vi.stubGlobal('fetch', vi.fn().mockReturnValue(promise));
import '_test_helpers/enzyme_matchers';

(global as any).HTMLFormElement.prototype.submit =
  (): void => { /* do nothing */ };

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
