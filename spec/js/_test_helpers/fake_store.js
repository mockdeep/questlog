export default {
  create() {
    this.createPromise = new Promise((resolve) => {
      process.nextTick(() => {
        resolve();
      });
    });

    return this.createPromise;
  }
};
