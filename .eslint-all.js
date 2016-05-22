var _ = require('lodash');

var allRules = require('eslint/conf/eslint.json').rules;
var allEnabled = _.mapValues(allRules, function () { return 'error'; });
// enable all react rules, too
module.exports = { rules: allEnabled };
