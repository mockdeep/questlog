 
window.onerror = (...args) => {
  if (document.readyState === "complete") {
    displayError(...args);
  } else {
    document.onreadystatechange = () => {
      if (document.readyState !== "complete") { return; }
      displayError(...args);
    };
  }
};

 
function displayError(
  message: string | Event,
  url: string | undefined,
  lineNumber: number | undefined,
  column: number | undefined,
  error: Error | undefined,
): void {
  document.body.innerHTML = `
    <h1>javascript error while testing:</h1>
    message: ${message}<br />
    url: ${url}<br />
    line number: ${lineNumber}<br />
    column: ${column}<br />
    stack: ${error && error.stack && error.stack.replaceAll("\n", "<br />")}
  `;
}
