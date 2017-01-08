'use strict';

import QNotification from 'js/q_notification';

window.Notification = {};

describe('QNotification.isPermissionGranted', () => {
  it('returns true when permission is "granted"', () => {
    window.Notification.permission = 'granted';
    expect(QNotification.isPermissionGranted()).toBe(true);
  });

  it('returns false when permission is "denied"', () => {
    window.Notification.permission = 'denied';
    expect(QNotification.isPermissionGranted()).toBe(false);
  });

  it('returns false when permission is "default"', () => {
    window.Notification.permission = 'default';
    expect(QNotification.isPermissionGranted()).toBe(false);
  });
});
