import tagReducer from 'src/tag/reducer';

describe('tag/INIT', () => {
  it('sets up the basic structure for the store', () => {
    const expected = {orderedIds: [], byId: {}};

    expect(tagReducer(null, {type: 'tag/INIT'})).toEqual(expected);
  });
});

describe('tag/SET', () => {
  it('replaces the existing tags', () => {
    const previousState = {
      meta: 'foo',
      byId: {dont: 'care'},
      orderedIds: [1, 2, 3],
    };
    const tag1 = {id: 1, name: 'a tag'};
    const tag2 = {id: 5, name: 'wat tag'};
    const action = {type: 'tag/SET', payload: [tag2, tag1]};
    const expected = {
      meta: 'foo',
      byId: {1: tag1, 5: tag2},
      orderedIds: [5, 1],
    };

    expect(tagReducer(previousState, action)).toEqual(expected);
  });
});

describe('tag/UPDATE', () => {
  it('throws an error when tag is missing from state', () => {
    const previousState = {byId: {}};
    const payload = {id: 1, bloo: 'blargh'};
    const action = {type: 'tag/UPDATE', payload};
    const expectedError = 'no tag found for id 1';

    expect(() => { tagReducer(previousState, action); }).toThrow(expectedError);
  });

  it('merges into the existing state', () => {
    const previousState = {
      byId: {1: {id: 1, goo: 'ber', bloo: 'blah'}, 2: {id: 2, bar: 'butz'}},
      orderedIds: [1, 2],
    };
    const payload = {id: 1, bloo: 'blargh'};
    const action = {type: 'tag/UPDATE', payload};
    const expectedState = {
      byId: {1: {id: 1, goo: 'ber', bloo: 'blargh'}, 2: {id: 2, bar: 'butz'}},
      orderedIds: [1, 2],
    };

    expect(tagReducer(previousState, action)).toEqual(expectedState);
  });
});

describe('tag/UPDATE_META', () => {
  it('updates meta information in the state', () => {
    const previousState = {meta: {foo: 'bar', baz: 'butz'}};
    const action = {type: 'tag/UPDATE_META', payload: {baz: 'bootz'}};
    const expectedState = {meta: {foo: 'bar', baz: 'bootz'}};

    expect(tagReducer(previousState, action)).toEqual(expectedState);
  });
});
