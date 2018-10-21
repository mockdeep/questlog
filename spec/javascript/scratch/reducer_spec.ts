import scratchReducer from 'src/scratch/reducer';
import {
  INIT, CREATE, DELETE, UPDATE,
  createScratchPlain, deleteScratchPlain, updateScratchPlain,
} from 'src/scratch/action_creators';

describe(INIT, () => {
  it('returns an empty scratch object', () => {
    expect(scratchReducer(null, {type: INIT})).toEqual({});
  });
});

describe(CREATE, () => {
  it('returns an object with the given key added', () => {
    const action = createScratchPlain('fookey');

    expect(scratchReducer({}, action)).toEqual({fookey: {}});
  });

  it('preserves other keys existing in the state', () => {
    const action = createScratchPlain('fookey');

    expect(scratchReducer({blah: {}}, action)).toEqual({fookey: {}, blah: {}});
  });
});

describe(DELETE, () => {
  it('returns an object without the given key', () => {
    const action = deleteScratchPlain('fookey');

    expect(scratchReducer({blah: {}, fookey: {}}, action)).toEqual({blah: {}});
  });
});

describe(UPDATE, () => {
  it('returns an object with the given key merged', () => {
    const action = updateScratchPlain({key: 'fookey', taskTitle: 'new value'});
    const previousState = {blah: {}, fookey: {taskTitle: 'old value'}};
    const expectedState = {blah: {}, fookey: {taskTitle: 'new value'}};

    expect(scratchReducer(previousState, action)).toEqual(expectedState);
  });
});
