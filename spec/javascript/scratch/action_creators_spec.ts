import {
  CREATE, DELETE, UPDATE,
  createScratch, deleteScratch, updateScratch,
} from 'src/scratch/action_creators';

describe('createScratch', () => {
  describe('thunk', () => {
    it('dispatches a CREATE action object', () => {
      const scratchKey = 'some key thing';
      const expectedAction = {type: CREATE, payload: scratchKey};
      const dispatch = jest.fn();
      const getState = jest.fn(() => ({scratch: {}}));
      const thunk = createScratch(scratchKey);

      thunk(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('throws an error when scratchKey already exists', () => {
      const scratchKey = 'some key thing';
      const scratch = {[scratchKey]: {}};
      const dispatch = jest.fn();
      const getState = jest.fn(() => ({scratch}));
      const thunk = createScratch(scratchKey);

      expect(() => { thunk(dispatch, getState); }).toThrow(/already has key/u);
    });
  });
});

describe('deleteScratch', () => {
  describe('thunk', () => {
    it('dispatches a DELETE action object', () => {
      const scratchKey = 'some key thing';
      const scratch = {[scratchKey]: {}};
      const expectedAction = {type: DELETE, payload: scratchKey};
      const dispatch = jest.fn();
      const getState = jest.fn(() => ({scratch}));
      const thunk = deleteScratch(scratchKey);

      thunk(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('throws an error when scratchKey does not exists', () => {
      const scratchKey = 'some key thing';
      const dispatch = jest.fn();
      const getState = jest.fn(() => ({scratch: {}}));
      const thunk = deleteScratch(scratchKey);

      expect(() => { thunk(dispatch, getState); }).toThrow(/no such key/u);
    });
  });
});

describe('updateScratch', () => {
  describe('thunk', () => {
    it('dispatches an UPDATE action object', () => {
      const scratchKey = 'some key thing';
      const scratch = {[scratchKey]: {}};
      const payload = {key: scratchKey, foo: 'butz'};
      const expectedAction = {type: UPDATE, payload};
      const dispatch = jest.fn();
      const getState = jest.fn(() => ({scratch}));
      const thunk = updateScratch(scratchKey, {foo: 'butz'});

      thunk(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('throws an error when scratchKey does not exists', () => {
      const scratchKey = 'some key thing';
      const dispatch = jest.fn();
      const getState = jest.fn(() => ({scratch: {}}));
      const thunk = updateScratch(scratchKey, {});

      expect(() => { thunk(dispatch, getState); }).toThrow(/no such key/u);
    });
  });
});
