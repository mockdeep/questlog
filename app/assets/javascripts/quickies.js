$(document).ready(function () {
  $('a.attach-context').click(function () {
    var quickieField = $('#quickie_context_ids'),
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
});
