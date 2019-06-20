const INIT = 'scratch/INIT';
const CREATE = 'scratch/CREATE';
const DELETE = 'scratch/DELETE';
const SET = 'scratch/SET';
const UPDATE = 'scratch/UPDATE';

import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';

interface AsyncAction extends ThunkAction<void, State, null, Action> { }
type ScratchKey = string;
export type Payload = {
  taskTitle?: string;
  keyName?: string; // for tests, should remove
  key: ScratchKey;
};

function createScratchPlain(payload: ScratchKey) {
  return {type: CREATE, payload};
}

function deleteScratchPlain(payload: ScratchKey) {
  return {type: DELETE, payload};
}

function updateScratchPlain(payload: Payload) {
  return {type: UPDATE, payload};
}

function createScratch(scratchKey: ScratchKey): AsyncAction {
  return function createScratchThunk(dispatch, getState) {
    if (getState().scratch.hasOwnProperty(scratchKey)) {
      throw new Error(`Scratch state already has key: "${scratchKey}"`);
    }

    dispatch(createScratchPlain(scratchKey));
  };
}

function deleteScratch(scratchKey: ScratchKey): AsyncAction {
  return function deleteScratchThunk(dispatch, getState) {
    if (!getState().scratch.hasOwnProperty(scratchKey)) {
      throw new Error(`Scratch has no such key to delete: "${scratchKey}"`);
    }

    dispatch(deleteScratchPlain(scratchKey));
  };
}

function updateScratch(
  scratchKey: ScratchKey,
  payload: Partial<Payload>,
): AsyncAction {
  return function updateScratchThunk(dispatch, getState) {
    if (!getState().scratch.hasOwnProperty(scratchKey)) {
      throw new Error(`Scratch has no such key to update: "${scratchKey}"`);
    }

    dispatch(updateScratchPlain({key: scratchKey, ...payload}));
  };
}

export {INIT, CREATE, DELETE, SET, UPDATE};
export {createScratchPlain, deleteScratchPlain, updateScratchPlain};
export {createScratch, deleteScratch, updateScratch};
