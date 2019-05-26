class FakeNotification {
  message: string;

  actions: null;

  badge: null;

  body: null;

  data: null;

  dir: null;

  icon: null;

  image: null;

  lang: null;

  onclick: null;

  onclose: null;

  onerror: null;

  onshow: null;

  renotify: null;

  requireInteraction: null;

  silent: null;

  tag: null;

  timestamp: null;

  title: null;

  vibrate: null;

  addEventListener: null;

  removeEventListener: null;

  dispatchEvent: null;

  isOpen: boolean;

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
}

export default FakeNotification;
