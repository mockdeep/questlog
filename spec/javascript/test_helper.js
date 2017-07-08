console.error = function error(message) { // eslint-disable-line no-console
  throw new Error(message);
};

import 'whatwg-fetch';
window.Notification = {};
