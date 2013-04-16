$(document).ready(function () {
  $('a.attach-context').click(function () {
    var quickieField = $('#quickie_context_ids'),
        contextIds = JSON.parse(quickieField.val()),
        contextId = $(this).data('context-id'),
        index = contextIds.indexOf(contextId);
    //console.log($('#quickie_context_ids').data('context-ids'));
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
    console.log(contextIds);
    quickieField.val(JSON.stringify(contextIds));
    // if this.active?
    //   deactivate
    //   remove id from context_ids
    // else
    //   activate
    //   add id to context_ids
    // end
    //$(this).toggleClass("active");
  });

  $('#quickie_title').focus();
});
