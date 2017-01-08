'use strict';

import QNotification from 'js/q_notification';

window.Notification = {};

describe('QNotification.isPermissionGranted', function () {
  it('returns true when permission is "granted"', function () {
    window.Notification.permission = 'granted';
    expect(QNotification.isPermissionGranted()).to.be.true();
  });

  it('returns false when permission is "denied"', function () {
    window.Notification.permission = 'denied';
    expect(QNotification.isPermissionGranted()).to.be.false();
  });

  it('returns false when permission is "default"', function () {
    window.Notification.permission = 'default';
    expect(QNotification.isPermissionGranted()).to.be.false();
  });
});
