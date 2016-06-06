'use strict';

const eslintRules = require('../eslint-all').rules;

describe('eslint-all', function () {
  it('sets all rules to "error"', function () {
    for (const ruleName in eslintRules) {
      if (!eslintRules.hasOwnProperty(ruleName)) { return; }

      expect(eslintRules[ruleName]).to.equal('error');
    }
  });

  it('sets regular eslint rules', function () {
    expect(eslintRules.eqeqeq).to.equal('error');
    expect(eslintRules.curly).to.equal('error');
  });

  it('sets react plugin rules to "error"', function () {
    expect(eslintRules['react/no-multi-comp']).to.equal('error');
  });

  it('does not include deprecated rules', function () {
    expect(eslintRules).to.not.have.property('react/jsx-sort-prop-types');
  });
});
