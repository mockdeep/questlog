'use strict';

const fs = require('fs');
const ReactTools = require('react-tools');

require.extensions['.jsx'] = function (module, filename) {
  // eslint-disable-next-line no-sync
  const content = fs.readFileSync(filename, 'utf8');
  const compiled = ReactTools.transform(content, {harmony: true});

  // eslint-disable-next-line no-underscore-dangle
  return module._compile(compiled, filename);
};
