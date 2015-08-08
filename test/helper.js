'use strict';

var path = require('path');
var jsPath = path.normalize(__dirname + '../../app/assets/javascripts/');

var jsdom = require('jsdom');

global.document = jsdom.jsdom('<html><body></body></html>');
global.window = document.defaultView;
global.navigator = { userAgent: 'mocha' };

global.expect = require('chai').expect;
global.componentPath = function (componentName) { return jsPath + componentName; };
