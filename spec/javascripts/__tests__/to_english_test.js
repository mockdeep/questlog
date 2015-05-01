'use strict';

jest.dontMock(componentPath('to_english'));

var ToEnglish = require(componentPath('to_english'));

describe('ToEnglish.seconds', function () {

  it('returns seconds when < 1 minute', function () {
    expect(ToEnglish.seconds(0)).toBe('None');
    expect(ToEnglish.seconds(1)).toBe('1 second');
    expect(ToEnglish.seconds(10)).toBe('10 seconds');
  });

  it('returns minute counts when < 1 hour', function () {
    expect(ToEnglish.seconds(60)).toBe('1 minute');
    expect(ToEnglish.seconds(65)).toBe('1 minute');
    expect(ToEnglish.seconds(305)).toBe('5 minutes');
    expect(ToEnglish.seconds(605)).toBe('10 minutes');
  });

  it('returns hours and minutes when > 1 hour', function () {
    expect(ToEnglish.seconds(3600)).toBe('1 hour');
    expect(ToEnglish.seconds(3660)).toBe('1 hour, 1 minute');
    expect(ToEnglish.seconds(7200)).toBe('2 hours');
    expect(ToEnglish.seconds(7265)).toBe('2 hours, 1 minute');
  });

  it('handles floating point numbers', function () {
    expect(ToEnglish.seconds(32.5)).toBe('32 seconds');
  });

  it('throws an error when given a negative number', function () {
    var expectedError = new RangeError('number must not be negative');
    expect(function () { ToEnglish.seconds(-1); }).toThrow(expectedError);
  });

  it('throws an error given an invalid type', function () {
    var expectedError = new TypeError('input must be a number');
    expect(function () { ToEnglish.seconds('0'); }).toThrow(expectedError);
    expect(function () { ToEnglish.seconds('Blah'); }).toThrow(expectedError);
    expect(function () { ToEnglish.seconds(['Blah']); }).toThrow(expectedError);
    expect(function () { ToEnglish.seconds({Bla: 0}); }).toThrow(expectedError);
  });
});
