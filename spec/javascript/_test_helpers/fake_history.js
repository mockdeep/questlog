export default {
  reset() { this.paths = []; },
  push(path) {
    this.paths = this.paths || [];
    this.paths.push(path);
  },
};
