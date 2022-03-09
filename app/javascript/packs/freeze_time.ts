import FakeTimers from '@sinonjs/fake-timers';
import {assert} from 'src/_helpers/assert';

const element = assert(document.querySelector('.time-freeze'));
if (element instanceof HTMLElement) {
  const now = Number(element.dataset.timestamp);
  FakeTimers.install({now});
} else {
  throw new Error('element is not HTMLElement');
}
