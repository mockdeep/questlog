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
