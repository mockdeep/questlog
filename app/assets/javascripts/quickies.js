$(document).ready(function () {
  $('#new_title').focus();

  $('#quickie').click(function () {
    editIcon = $('#edit-quickie');
    if (editIcon.hasClass('icon-arrow-down')) {
      $('#new-form').fadeOut(200, function () {
        $('#buttons').fadeOut(200, function () {
          $('#edit-form').fadeIn(200);
          $('#edit_title').focus();
        });
      });
    } else {
      $('#edit-form').fadeOut(200, function () {
        $('#buttons').fadeIn(200, function () {
          $('#new-form').fadeIn(200);
          $('#new_title').focus();
        });
      });
    }
    editIcon.fadeOut(function () {
      editIcon.toggleClass('icon-arrow-down');
      editIcon.toggleClass('icon-arrow-up');
      editIcon.fadeIn();
    });
  });

  $('.icon-remove').click(function (e) {
    e.stopPropagation();
    if (confirm('Delete this Quickie?')) {
      $('#delete-form').submit();
    }
  });
});
