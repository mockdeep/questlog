class FakeNotification {
  constructor(message) {
    this.message = message;
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }
}

export default FakeNotification;
