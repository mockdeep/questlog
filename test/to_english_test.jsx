'use strict';

var ToEnglish = require('to_english');

describe('ToEnglish.seconds', function () {

  it('returns seconds when < 1 minute', function () {
    expect(ToEnglish.seconds(0)).to.equal('None');
    expect(ToEnglish.seconds(1)).to.equal('1 second');
    expect(ToEnglish.seconds(10)).to.equal('10 seconds');
  });

  it('returns minute counts when < 1 hour', function () {
    expect(ToEnglish.seconds(60)).to.equal('1 minute');
    expect(ToEnglish.seconds(65)).to.equal('1 minute');
    expect(ToEnglish.seconds(305)).to.equal('5 minutes');
    expect(ToEnglish.seconds(605)).to.equal('10 minutes');
    expect(ToEnglish.seconds(1800)).to.equal('30 minutes');
  });

  it('returns hours and minutes when > 1 hour', function () {
    expect(ToEnglish.seconds(3600)).to.equal('1 hour');
    expect(ToEnglish.seconds(3660)).to.equal('1 hour, 1 minute');
    expect(ToEnglish.seconds(7200)).to.equal('2 hours');
    expect(ToEnglish.seconds(7265)).to.equal('2 hours, 1 minute');
  });

  it('handles floating point numbers', function () {
    expect(ToEnglish.seconds(32.5)).to.equal('32 seconds');
  });

  it('throws an error when given a negative number', function () {
    var expectedError = new RangeError('number must not be negative');
    expect(function () { ToEnglish.seconds(-1); }).to.throw(RangeError, 'number must not be negative');
  });

  it('throws an error given an invalid type', function () {
    var expectedError = new TypeError('input must be a number');
    expect(function () { ToEnglish.seconds('0'); }).to.throw(TypeError, 'input must be a number');
    expect(function () { ToEnglish.seconds('Blah'); }).to.throw(TypeError, 'input must be a number');
    expect(function () { ToEnglish.seconds(['Blah']); }).to.throw(TypeError, 'input must be a number');
    expect(function () { ToEnglish.seconds({Bla: 0}); }).to.throw(TypeError, 'input must be a number');
  });
});
