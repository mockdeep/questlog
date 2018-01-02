import grab from 'src/_helpers/grab';

it('throws an error when object has no such key', () => {
  const expected = 'object has no key "someKey". <{"aKey":"blah"}>';
  expect(() => grab({aKey: 'blah'}, 'someKey')).toThrow(expected);
});

it('returns the value stored at key when present', () => {
  expect(grab({aKey: 'blah'}, 'aKey')).toBe('blah');
});
