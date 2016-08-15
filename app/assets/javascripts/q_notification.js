'use strict';

module.exports = {

  isPermissionGranted() {
    return window.Notification.permission === 'granted';
  }

};
