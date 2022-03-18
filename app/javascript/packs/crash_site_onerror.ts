function displayError(...args) {
  document.body.innerHTML = `
    <h1>javascript error while testing:</h1>
    message: ${args.message}<br />
    url: ${args.url}<br />
    line number: ${args.lineNumber}<br />
    column: ${args.column}<br />
    stack: ${args.error.stack && args.error.stack.replaceAll('\n', '<br />')}
  `;
}

window.onerror = (...args) => {
  if (document.readyState === 'complete') {
    displayError(...args);
  } else {
    document.onreadystatechange = () => {
      if (document.readyState !== 'complete') { return; }
      displayError(...args);
    };
  }
};
