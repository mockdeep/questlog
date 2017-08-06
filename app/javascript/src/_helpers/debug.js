function debug(...args) {
  let result;
  let message;

  if (args.length === 2) {
    result = args[1];
    message = `debug (${args[0]})`;
  } else {
    result = args[0];
    message = 'debug';
  }

  // eslint-disable-next-line no-console
  console.log(`${message} --> `, result);

  return result;
}

export default debug;
