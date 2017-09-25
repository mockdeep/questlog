class FakeNotification {
  static requestPermission() {
    return Promise.resolve('granted');
  }

  constructor(message) {
    this.message = message;
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }
}

export default FakeNotification;
