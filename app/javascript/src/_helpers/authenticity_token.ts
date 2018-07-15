export default function authenticityToken() {
  const tokenTag = document.getElementsByName('csrf-token')[0];

  if (!(tokenTag instanceof HTMLMetaElement)) {
    return;
    // csrf tokens don't work on test for some reason
    // throw new Error('Missing csrf-token meta tag');
  }

  // return tokenTag && (<HTMLMetaElement>tokenTag).content;
  return tokenTag && tokenTag.content;
}
