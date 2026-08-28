import FakeTimers from "@sinonjs/fake-timers";

const element = document.querySelector(".time-freeze");
if (!(element instanceof HTMLElement)) {
  throw new Error("element is not HTMLElement");
}

/*
 * Turbo runs this script again on every visit, but the clock it installed on
 * the first one is still ticking -- or rather, still not ticking. Installing a
 * second time throws, and so does handing the first clock back to install a
 * fresh one, so the only safe move is to leave it alone.
 */
if (!("isFake" in Date)) {
  const now = Number(element.dataset.timestamp);

  FakeTimers.install({now, toFake: ["Date"]});
}
