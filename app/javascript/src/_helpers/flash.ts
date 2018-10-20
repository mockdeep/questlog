declare const $: any;

export default function flash(status: string, message: string) {
  const $myFlash = $('<div />', {'class': `flash-${status}`, text: message});

  $('#flashes').append($myFlash);
  $('[class^=flash-]').fadeOut(1500);
}
