$(document).ready(function () {
  $('a.attach-context').click(function () {
    var namespace = $(this).data('namespace'),
        quickieField = $('#' + namespace + '_context_ids'),
        contextIds = JSON.parse(quickieField.val()),
        contextId = $(this).data('context-id'),
        index = contextIds.indexOf(contextId);
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      if (index !== -1) {
        contextIds.splice(index, 1);
      }
    } else {
      $(this).addClass('active');
      if (index === -1) {
        contextIds.push(contextId);
      }
    }
    quickieField.val(JSON.stringify(contextIds));
  });

  $('#quickie_title').focus();

  $('#quickie').click(function () {
    editIcon = $('#edit-arrow');
    if (editIcon.hasClass('icon-arrow-down')) {
      $('#new-form').fadeOut(200, function () {
        $('#buttons').fadeOut(200, function () {
          $('#edit-form').fadeIn(200);
        });
      });
    } else {
      $('#edit-form').fadeOut(200, function () {
        $('#buttons').fadeIn(200, function () {
          $('#new-form').fadeIn(200);
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
