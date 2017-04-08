import ToEnglish from 'src/_helpers/to_english';

describe('ToEnglish.seconds', () => {
  it('returns seconds when < 1 minute', () => {
    expect(ToEnglish.seconds(0)).toBe('None');
    expect(ToEnglish.seconds(1)).toBe('1 second');
    expect(ToEnglish.seconds(10)).toBe('10 seconds');
  });

  it('returns minute counts when < 1 hour', () => {
    expect(ToEnglish.seconds(60)).toBe('1 minute');
    expect(ToEnglish.seconds(65)).toBe('1 minute');
    expect(ToEnglish.seconds(305)).toBe('5 minutes');
    expect(ToEnglish.seconds(605)).toBe('10 minutes');
    expect(ToEnglish.seconds(1800)).toBe('30 minutes');
  });

  it('returns hours and minutes when > 1 hour', () => {
    expect(ToEnglish.seconds(3600)).toBe('1 hour');
    expect(ToEnglish.seconds(3660)).toBe('1 hour, 1 minute');
    expect(ToEnglish.seconds(7200)).toBe('2 hours');
    expect(ToEnglish.seconds(7265)).toBe('2 hours, 1 minute');
  });

  it('handles floating point numbers', () => {
    expect(ToEnglish.seconds(32.5)).toBe('32 seconds');
  });

  it('throws an error when given a negative number', () => {
    const message = 'number must not be negative';

    expect(ToEnglish.seconds.bind(null, -1)).toThrow(RangeError, message);
  });

  it('throws an error given an invalid type', () => {
    const message = 'input must be a number';

    expect(ToEnglish.seconds.bind(null, '0')).toThrow(TypeError, message);
    expect(ToEnglish.seconds.bind(null, 'Blah')).toThrow(TypeError, message);
    expect(ToEnglish.seconds.bind(null, ['Blah'])).toThrow(TypeError, message);
    expect(ToEnglish.seconds.bind(null, {Bla: 0})).toThrow(TypeError, message);
  });
});
