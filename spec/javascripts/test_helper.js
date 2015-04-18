'use strict';

var path = require('path');
var jsPath = path.normalize(__dirname + '../../../app/assets/javascripts/');

componentPath = function (componentName) { return jsPath + componentName; }
