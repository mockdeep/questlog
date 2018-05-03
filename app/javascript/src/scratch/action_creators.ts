const INIT = 'scratch/INIT';
const CREATE = 'scratch/CREATE';
const DELETE = 'scratch/DELETE';
const UPDATE = 'scratch/UPDATE';

function createScratchPlain(payload) {
  return {type: CREATE, payload};
}

function deleteScratchPlain(payload) {
  return {type: DELETE, payload};
}

function updateScratchPlain(payload) {
  return {type: UPDATE, payload};
}

function createScratch(scratchKey) {
  return function createScratchThunk(dispatch, getState) {
    if (getState().scratch.hasOwnProperty(scratchKey)) {
      throw new Error(`Scratch state already has key: "${scratchKey}"`);
    }

    dispatch(createScratchPlain(scratchKey));
  };
}

function deleteScratch(scratchKey) {
  return function deleteScratchThunk(dispatch, getState) {
    if (!getState().scratch.hasOwnProperty(scratchKey)) {
      throw new Error(`Scratch has no such key to delete: "${scratchKey}"`);
    }

    dispatch(deleteScratchPlain(scratchKey));
  };
}

function updateScratch(scratchKey, payload) {
  return function updateScratchThunk(dispatch, getState) {
    if (!getState().scratch.hasOwnProperty(scratchKey)) {
      throw new Error(`Scratch has no such key to update: "${scratchKey}"`);
    }

    dispatch(updateScratchPlain({key: scratchKey, ...payload}));
  };
}

export {INIT, CREATE, DELETE, UPDATE};
export {createScratchPlain, deleteScratchPlain, updateScratchPlain};
export {createScratch, deleteScratch, updateScratch};
