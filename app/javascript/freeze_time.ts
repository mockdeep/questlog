import FakeTimers from "@sinonjs/fake-timers";

const element = document.querySelector(".time-freeze");
if (element instanceof HTMLElement) {
  const now = Number(element.dataset.timestamp);

  /*
   * Turbo runs this script again on every visit, and fake timers refuse to
   * install over themselves, so hand the previous page's clock back first.
   */
  window.clock?.uninstall();
  window.clock = FakeTimers.install({now, toFake: ["Date"]});
} else {
  throw new Error("element is not HTMLElement");
}
