'use strict';

import path from 'path';
import jsdom from 'jsdom';
import chai from 'chai';
import dirtyChai from 'dirty-chai';

// add the application directory to require paths
const jsPath = path.normalize(`${__dirname}../../app/assets/javascripts/`);

// eslint-disable-next-line no-process-env
process.env.NODE_PATH = `${jsPath}:${process.env.NODE_PATH}`;

// can switch to using `app-module-path` to avoid the following
import Module from 'module';
// eslint-disable-next-line no-underscore-dangle
Module._initPaths();

// set up global dom
const jsdomConfig = {url: 'https://questlog.io'};

global.document = jsdom.jsdom('<html><body></body></html>', jsdomConfig);
global.window = document.defaultView;
global.navigator = {userAgent: 'mocha'};

console.error = function (message) { // eslint-disable-line no-console
  throw new Error(message);
};

chai.use(dirtyChai);
global.expect = chai.expect;
