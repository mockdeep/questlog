'use strict';

module.exports = function flash(status, message) {
  const $myFlash = $('<div />', {'class': `flash-${status}`, text: message});

  $('#flashes').append($myFlash);
  $('[class^=flash-]').fadeOut(1500);
};
