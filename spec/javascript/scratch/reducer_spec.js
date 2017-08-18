import scratchReducer from 'src/scratch/reducer';
import {
  INIT, CREATE, DELETE, UPDATE,
  createScratch, deleteScratch, updateScratch,
} from 'src/scratch/action_creators';

describe(INIT, () => {
  it('returns an empty scratch object', () => {
    expect(scratchReducer(null, {type: INIT})).toEqual({});
  });
});

describe(CREATE, () => {
  it('returns an object with the given key added', () => {
    const action = createScratch('fookey');

    expect(scratchReducer({}, action)).toEqual({fookey: {}});
  });

  it('preserves other keys existing in the state', () => {
    const action = createScratch('fookey');

    expect(scratchReducer({blah: {}}, action)).toEqual({fookey: {}, blah: {}});
  });

  it('raises an error when the key already exists in the state', () => {
    const action = createScratch('fookey');

    expect(() => {
      scratchReducer({fookey: {}}, action);
    }).toThrow(/already has key: "fookey"/);
  });
});

describe(DELETE, () => {
  it('returns an object without the given key', () => {
    const action = deleteScratch('fookey');

    expect(scratchReducer({blah: {}, fookey: {}}, action)).toEqual({blah: {}});
  });

  it('raises an error when the key does not exist in the state', () => {
    const action = deleteScratch('fookey');

    expect(() => {
      scratchReducer({blah: {}}, action);
    }).toThrow(/no such key to delete: "fookey"/);
  });
});

describe(UPDATE, () => {
  it('returns an object with the given key merged', () => {
    const action = updateScratch('fookey', {some: 'new value'});
    const previousState = {blah: {}, fookey: {some: 'old value'}};
    const expectedState = {blah: {}, fookey: {some: 'new value'}};

    expect(scratchReducer(previousState, action)).toEqual(expectedState);
  });

  it('throws an error when the key does not exist in the state', () => {
    const action = updateScratch('fookey', {some: 'new value'});
    const previousState = {blah: {}};

    expect(() => {
      scratchReducer(previousState, action);
    }).toThrow(/no such key to update: "fookey"/);
  });
});
