'use strict';

const path = require('path');
const jsdom = require('jsdom');
const chai = require('chai');
const dirtyChai = require('dirty-chai');

// add the application directory to require paths
const jsPath = path.normalize(`${__dirname}../../app/assets/javascripts/`);

// eslint-disable-next-line no-process-env
process.env.NODE_PATH = `${jsPath}:${process.env.NODE_PATH}`;

// can switch to using `app-module-path` to avoid the following
// eslint-disable-next-line no-underscore-dangle
require('module').Module._initPaths();

// set up global dom
global.document = jsdom.jsdom('<html><body></body></html>');
global.window = document.defaultView;
global.navigator = {userAgent: 'mocha'};

chai.use(dirtyChai);
global.expect = chai.expect;
