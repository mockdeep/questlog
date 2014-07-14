$(document).ready(function () {
  $('#new_title').focus();

  $('#task').click(function () {
    editIcon = $('#edit-task');
    if (editIcon.hasClass('fa-arrow-down')) {
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
      editIcon.toggleClass('fa-arrow-down');
      editIcon.toggleClass('fa-arrow-up');
      editIcon.fadeIn();
    });
  });

  $('.fa-times').click(function (e) {
    e.stopPropagation();
    if (confirm('Delete this task?')) {
      $('#delete-form').submit();
    }
  });

  $('#postpone').click(function () {
    $(this).parent('form').submit();
  });

  $('#task_postpone').click(function (e) {
    e.stopPropagation();
  });
});
