class FakeNotification {
  message: string;

  actions: NotificationAction[];

  badge: string;

  body: string;

  data: null;

  dir: NotificationDirection;

  icon: string;

  image: string;

  lang: string;

  onclick: null;

  onclose: null;

  onerror: null;

  onshow: null;

  renotify = false;

  requireInteraction = false;

  silent = false;

  tag = '';

  timestamp = Number(new Date());

  title: string;

  vibrate = [];

  isOpen = true;

  static requestPermission() {
    return Promise.resolve('granted');
  }

  constructor(message: string) {
    this.message = message;
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
