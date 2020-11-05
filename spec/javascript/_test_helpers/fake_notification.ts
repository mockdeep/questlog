class FakeNotification implements Notification {
  actions = [];

  badge = '';

  body = '';

  data = null;

  dir: NotificationDirection = 'auto';

  icon = '';

  image = '';

  lang = '';

  onclick = null;

  onclose = null;

  onerror = null;

  onshow = null;

  renotify = false;

  requireInteraction = false;

  silent = false;

  tag = '';

  timestamp = Number(new Date());

  title: string;

  vibrate = [];

  isOpen = true; // custom

  static requestPermission() {
    return Promise.resolve('granted');
  }

  constructor(title: string) {
    this.title = title;
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  addEventListener() {
    return true;
  }

  removeEventListener() {
    return true;
  }

  dispatchEvent() {
    return true;
  }
}

export default FakeNotification;
