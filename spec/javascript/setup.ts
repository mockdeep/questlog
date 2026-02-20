import "@testing-library/jest-dom/vitest";
import "support/shims";
import FakeNotification from "support/fake_notification";

const fakeResponse = {json: vi.fn().mockResolvedValue({})};
vi.stubGlobal("fetch", vi.fn().mockResolvedValue(fakeResponse));

(global as any).HTMLFormElement.prototype.submit =
  (): void => { /* do nothing */ };

declare global {
  interface Window {
    Notification: any;
  }
}

window.Notification = FakeNotification;

document.body.innerHTML = "<div id=\"app-base\"></div>";

beforeEach(() => {
  expect.hasAssertions();
});
