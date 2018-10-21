class FakeNotification {
  message: string;

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
