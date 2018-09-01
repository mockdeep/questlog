let listeners = [];
const DEFAULT_MEDIA_QUERY_LIST = {
  matches: false,
  addListener(callback) { listeners.push(callback); },
};

let mediaQueryList = {...DEFAULT_MEDIA_QUERY_LIST};

function matchMedia() {
  return mediaQueryList;
}

function setMatches(matches) {
  mediaQueryList.matches = matches;
  listeners.forEach(listener => listener());
}

matchMedia.reset = function reset() {
  listeners = [];
  mediaQueryList = {...DEFAULT_MEDIA_QUERY_LIST};
};

export default matchMedia;
export {setMatches};
