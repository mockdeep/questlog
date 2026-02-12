class FakeNotification implements Notification {
  actions = [];

  badge = "";

  body = "";

  data = null;

  dir: NotificationDirection = "auto";

  icon = "";

  image = "";

  lang = "";

  onclick = null;

  onclose = null;

  onerror = null;

  onshow = null;

  renotify = false;

  requireInteraction = false;

  silent = false;

  tag = "";

  timestamp = Number(new Date());

  title: string;

  vibrate = [];

  isOpen = true; // custom

  static requestPermission(): Promise<string> {
    return Promise.resolve("granted");
  }

  constructor(title: string) {
    this.title = title;
    this.isOpen = true;
  }

  close(): void {
    this.isOpen = false;
  }

  addEventListener(): boolean {
    return true;
  }

  removeEventListener(): boolean {
    return true;
  }

  dispatchEvent(): boolean {
    return true;
  }
}

export default FakeNotification;
