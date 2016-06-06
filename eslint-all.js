'use strict';

const eslintRules = require('eslint/conf/eslint.json').rules;
const reactRules = require('eslint-plugin-react').rules;
const enabledRules = {};

Object.keys(eslintRules).forEach(function setRule(ruleName) {
  enabledRules[ruleName] = 'error';
});

Object.keys(reactRules).forEach(function setReactRule(ruleName) {
  if (ruleName === 'jsx-sort-prop-types') { return; } // deprecated rule
  enabledRules[`react/${ruleName}`] = 'error';
});

module.exports = {rules: enabledRules};
