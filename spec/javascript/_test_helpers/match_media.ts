let listeners: Callback[] = [];
const DEFAULT_MEDIA_QUERY_LIST = {
  matches: false,
  addListener(callback: Callback) { listeners.push(callback); },
};

let mediaQueryList = {...DEFAULT_MEDIA_QUERY_LIST};

function matchMedia() {
  return mediaQueryList;
}

function setMatches(matches: boolean) {
  mediaQueryList.matches = matches;
  listeners.forEach(listener => listener());
}

function resetMedia() {
  listeners = [];
  mediaQueryList = {...DEFAULT_MEDIA_QUERY_LIST};
}

export default matchMedia;
export {resetMedia, setMatches};
