import {
  CREATE, DELETE, UPDATE,
  createScratch, deleteScratch, updateScratch,
} from 'src/scratch/action_creators';

describe('createScratch', () => {
  it('returns a CREATE action object', () => {
    const scratchKey = 'some key thing';
    const expectedAction = {type: CREATE, payload: scratchKey};

    expect(createScratch(scratchKey)).toEqual(expectedAction);
  });
});

describe('deleteScratch', () => {
  it('returns a DELETE action object', () => {
    const scratchKey = 'some key thing';
    const expectedAction = {type: DELETE, payload: scratchKey};

    expect(deleteScratch(scratchKey)).toEqual(expectedAction);
  });
});

describe('updateScratch', () => {
  it('returns an UPDATE action object', () => {
    const data = {poo: 'load'};
    const scratchKey = 'some key thing';
    const expectedAction = {type: UPDATE, payload: {key: scratchKey, ...data}};

    expect(updateScratch(scratchKey, data)).toEqual(expectedAction);
  });
});
