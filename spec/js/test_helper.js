console.error = function (message) { // eslint-disable-line no-console
  throw new Error(message);
};

afterEach(() => {
  jest.resetAllMocks();
});
