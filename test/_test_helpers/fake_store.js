export default {
  create() {
    this.createPromise = new Promise(function (resolve) {
      process.nextTick(function () {
        resolve();
      });
    });

    return this.createPromise;
  }
};
