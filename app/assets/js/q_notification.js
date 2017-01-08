'use strict';

export default {

  isPermissionGranted() {
    return window.Notification.permission === 'granted';
  }

};
