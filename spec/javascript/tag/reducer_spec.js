import {INIT, SET, UPDATE, UPDATE_META, UPSERT} from 'src/tag/action_creators';
import tagReducer from 'src/tag/reducer';

describe(INIT, () => {
  it('sets up the basic structure for the store', () => {
    const expected = {byId: {}, meta: {}};

    expect(tagReducer(null, {type: INIT})).toEqual(expected);
  });
});

describe(SET, () => {
  it('replaces the existing tags', () => {
    const previousState = {meta: 'foo', byId: {dont: 'care'}};
    const tag1 = {id: 1, name: 'a tag'};
    const tag2 = {id: 5, name: 'wat tag'};
    const action = {type: SET, payload: [tag2, tag1]};
    const expected = {meta: 'foo', byId: {1: tag1, 5: tag2}};

    expect(tagReducer(previousState, action)).toEqual(expected);
  });
});

describe(UPDATE, () => {
  it('throws an error when tag is missing from state', () => {
    const previousState = {byId: {}};
    const payload = {id: 1, bloo: 'blargh'};
    const action = {type: UPDATE, payload};
    const expectedError = 'no tag found for id 1';

    expect(() => { tagReducer(previousState, action); }).toThrow(expectedError);
  });

  it('merges into the existing state', () => {
    const tag1 = {id: 1, goo: 'ber', bloo: 'blah'};
    const tag2 = {id: 2, bar: 'butz'};
    const previousState = {byId: {1: tag1, 2: tag2}};
    const payload = {id: 1, bloo: 'blargh'};
    const action = {type: UPDATE, payload};
    const expectedState = {byId: {1: {...tag1, bloo: 'blargh'}, 2: tag2}};

    expect(tagReducer(previousState, action)).toEqual(expectedState);
  });
});

describe(UPDATE_META, () => {
  it('updates meta information in the state', () => {
    const previousState = {meta: {foo: 'bar', baz: 'butz'}};
    const action = {type: UPDATE_META, payload: {baz: 'bootz'}};
    const expectedState = {meta: {foo: 'bar', baz: 'bootz'}};

    expect(tagReducer(previousState, action)).toEqual(expectedState);
  });
});

describe(UPSERT, () => {
  it('updates the tag when existing', () => {
    const tag1 = {id: 1, goo: 'ber', bloo: 'blah'};
    const tag2 = {id: 2, bar: 'butz'};
    const previousState = {byId: {1: tag1, 2: tag2}};
    const payload = {id: 1, bloo: 'blargh'};
    const action = {type: UPSERT, payload};
    const expectedState = {byId: {1: {...tag1, bloo: 'blargh'}, 2: tag2}};

    expect(tagReducer(previousState, action)).toEqual(expectedState);
  });

  it('adds a new tag when one is not present', () => {
    const tag1 = {id: 1, goo: 'ber', bloo: 'blah'};
    const tag2 = {id: 2, bar: 'butz'};
    const previousState = {byId: {1: tag1}};
    const payload = tag2;
    const action = {type: UPSERT, payload};
    const expectedState = {byId: {1: tag1, 2: tag2}};

    expect(tagReducer(previousState, action)).toEqual(expectedState);
  });
});
