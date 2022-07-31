export default function flash(status: string, message: string): void {
  const $myFlash = $('<div />', {'class': `flash-${status}`, text: message});

  $('#flashes').append($myFlash);
  $('[class^=flash-]').fadeOut(1500);
}
