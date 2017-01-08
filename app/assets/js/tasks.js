'use strict';

import $ from 'jquery';

$(function setJqueryCallbacks() {
  const editIcon = $('#edit-task');

  $('#new-title').focus();

  editIcon.click(function toggleEditDisplay() {
    if (editIcon.hasClass('fa-arrow-down')) {
      $('#new-form').fadeOut(200, function hideButtons() {
        $('#buttons').fadeOut(200, function showEditForm() {
          $('#edit-form').fadeIn(200);
          $('#edit-title').focus();
        });
      });
    } else {
      $('#edit-form').fadeOut(200, function showButtons() {
        $('#buttons').fadeIn(200, function showNewForm() {
          $('#new-form').fadeIn(200);
          $('#new-title').focus();
        });
      });
    }
    editIcon.fadeOut(function toggleIcons() {
      editIcon.toggleClass('fa-arrow-down');
      editIcon.toggleClass('fa-arrow-up');
      editIcon.fadeIn();
    });
  });

  $('[class^=flash-]').fadeOut(1500);
});
