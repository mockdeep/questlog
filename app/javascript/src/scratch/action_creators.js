const INIT = 'scratch/INIT';
const CREATE = 'scratch/CREATE';
const DELETE = 'scratch/DELETE';
const UPDATE = 'scratch/UPDATE';

function createScratch(scratchKey) {
  return {type: CREATE, payload: scratchKey};
}

function deleteScratch(scratchKey) {
  return {type: DELETE, payload: scratchKey};
}

function updateScratch(scratchKey, payload) {
  return {type: UPDATE, payload: {key: scratchKey, ...payload}};
}

export {INIT, CREATE, DELETE, UPDATE};
export {createScratch, deleteScratch, updateScratch};
