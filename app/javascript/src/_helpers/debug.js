function isNode() {
  return typeof process !== 'undefined' && !process.browser;
}

const terminalEscapes = {
  magentaBackground: '\x1b[45m',
  lightBlueForeground: '\x1b[94m',
  bold: '\x1b[1m',
  reset: '\x1b[0m',
};

const terminalStyles = {
  debugStyle: `${terminalEscapes.magentaBackground}${terminalEscapes.bold}`,
  messageStyle: terminalEscapes.lightBlueForeground,
  arrowStyle: terminalEscapes.bold,
  reset: terminalEscapes.reset,
};

const browserStyles = {
  debugStyle: 'background-color: magenta; color: white',
  messageStyle: 'color: blue',
  arrowStyle: 'font-weight: bold',
  reset: '',
};

function debugNode({result, userLabel}) {
  const {debugStyle, messageStyle, arrowStyle, reset} = terminalStyles;
  let label;

  const debugLabel = `${debugStyle}  DEBUG  ${reset}`;

  if (userLabel) {
    label = `${debugLabel} (${messageStyle}${userLabel}${reset})`;
  } else {
    label = debugLabel;
  }

  const arrow = `${arrowStyle}==>${reset}`;

  // eslint-disable-next-line no-console
  console.log(`${label} ${arrow} `, result);

  return result;
}

function debugBrowser({result, userLabel}) {
  const {debugStyle, messageStyle, arrowStyle, reset} = browserStyles;
  const consoleArgs = [debugStyle, reset];
  const debugLabel = '%c  DEBUG  %c';
  let label;

  if (userLabel) {
    label = `${debugLabel} (%c${userLabel}%c)`;
    consoleArgs.push(messageStyle, reset);
  } else {
    label = debugLabel;
  }

  const arrow = '%c==>%c';

  consoleArgs.push(arrowStyle, reset);

  // eslint-disable-next-line no-console
  console.log(`${label} ${arrow}`, ...consoleArgs, result);
}

function debug(...args) {
  let result;
  let userLabel;

  if (args.length === 2) {
    [userLabel, result] = args;
  } else {
    [result] = args;
  }

  const debugMethod = isNode() ? debugNode : debugBrowser;

  debugMethod({result, userLabel});

  return result;
}

export default debug;
