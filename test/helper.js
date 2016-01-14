'use strict';


// add the application directory to require paths
var path = require('path');
var jsPath = path.normalize(__dirname + '../../app/assets/javascripts/')
process.env.NODE_PATH = jsPath + ':' + process.env.NODE_PATH
require('module').Module._initPaths();

// set up global dom
var jsdom = require('jsdom');
global.document = jsdom.jsdom('<html><body></body></html>');
global.window = document.defaultView;
global.navigator = { userAgent: 'mocha' };

global.expect = require('chai').expect;
