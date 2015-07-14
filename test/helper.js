'use strict';

var path = require('path');
var jsPath = path.normalize(__dirname + '../../app/assets/javascripts/');

module.exports = {
  componentPath: function (componentName) { return jsPath + componentName; }
}
