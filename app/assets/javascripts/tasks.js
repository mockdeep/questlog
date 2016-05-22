'use strict';

$(document).ready(function () {
  const editIcon = $('#edit-task');

  $('#new-title').focus();

  editIcon.click(function () {
    if (editIcon.hasClass('fa-arrow-down')) {
      $('#new-form').fadeOut(200, function () {
        $('#buttons').fadeOut(200, function () {
          $('#edit-form').fadeIn(200);
          $('#edit-title').focus();
        });
      });
    } else {
      $('#edit-form').fadeOut(200, function () {
        $('#buttons').fadeIn(200, function () {
          $('#new-form').fadeIn(200);
          $('#new-title').focus();
        });
      });
    }
    editIcon.fadeOut(function () {
      editIcon.toggleClass('fa-arrow-down');
      editIcon.toggleClass('fa-arrow-up');
      editIcon.fadeIn();
    });
  });

  $('[class^=flash-]').fadeOut(1500);
});
