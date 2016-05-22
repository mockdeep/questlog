var _ = require('lodash');

var eslintRules = require('eslint/conf/eslint.json').rules;
var eslintEnabled = _.mapValues(eslintRules, function () { return 'error'; });

var reactRules = require('eslint-plugin-react').rules;
var disabledRules = {'react/jsx-sort-prop-types': true};
var reactEnabled = _.reduce(reactRules, function (result, value, key) {
  const ruleName = `react/${key}`;

  if (disabledRules[ruleName]) { return result; }
  result[ruleName] = 'error';

  return result;
}, {});

var allEnabled = _.extend({}, eslintEnabled, reactEnabled);

module.exports = { rules: allEnabled };
