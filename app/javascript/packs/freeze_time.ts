import FakeTimers from '@sinonjs/fake-timers';

const element = document.querySelector('.time-freeze');
if (element instanceof HTMLElement) {
  const now = Number(element.dataset.timestamp);
  FakeTimers.install({now});
} else {
  throw new Error('element is not HTMLElement');
}
