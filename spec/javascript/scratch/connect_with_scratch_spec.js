import React from 'react';
import {mount} from 'enzyme';

import connectWithScratch from 'src/scratch/connect_with_scratch';
import createAppStore from 'src/create_app_store';
import {createScratch, updateScratch} from 'src/scratch/action_creators';

const renderOpts = {lifecycleExperimental: true};
let container;
let store;

function computeScratchKey(state) {
  if (state.scratch.scratchKeySpecial && state.scratch.scratchKeySpecial.keyName) {
    return state.scratch.scratchKeySpecial.keyName;
  }

  return 'testScratchKey';
}

function TestComponent() {
  return <div>{'Hello'}</div>;
}

function wrapComponent(...args) {
  const connector = connectWithScratch(...args);
  const WrappedComponent = connector(TestComponent);

  container = mount(<WrappedComponent store={store} />, renderOpts);

  return container.find(TestComponent);
}

beforeEach(() => { store = createAppStore(); });

it('passes state mapped from props down to the wrapped component', () => {
  function mapStateToProps(state) {
    return {
      dooble: 'dobble',
      propFromState: state.scratch.oneTest.value,
    };
  }

  store.dispatch(createScratch('oneTest'));
  store.dispatch(updateScratch('oneTest', {value: 'something'}));

  const testComponent = wrapComponent(computeScratchKey, mapStateToProps, {});

  expect(testComponent).toHaveProp('dooble', 'dobble');
  expect(testComponent).toHaveProp('propFromState', 'something');
});

it('creates a new scratch space based on the given key', () => {
  expect(store.getState().scratch.testScratchKey).toBeUndefined();

  wrapComponent(computeScratchKey, jest.fn(() => ({})), {});

  expect(store.getState().scratch.testScratchKey).toEqual({});
});

it('passes a bound updateScratch down to the wrapped component', () => {
  const testComponent = wrapComponent(computeScratchKey, jest.fn(() => ({})), {});

  expect(store.getState().scratch.testScratchKey).toEqual({});

  const updateScratchProp = testComponent.prop('updateScratch');

  expect(updateScratchProp).toBeInstanceOf(Function);
  updateScratchProp({stooble: 'stobble'});

  expect(store.getState().scratch.testScratchKey).toEqual({stooble: 'stobble'});
});

it('passes the appropriate scratch state down to the wrapped component', () => {
  const testComponent = wrapComponent(computeScratchKey, jest.fn(() => ({})), {});

  expect(testComponent).toHaveProp('scratch', {});

  store.dispatch(updateScratch('testScratchKey', {value: 'something'}));

  expect(testComponent).toHaveProp('scratch', {value: 'something'});
});

it('removes the scratch key when the component is unmounted', () => {
  wrapComponent(computeScratchKey, jest.fn(() => ({})), {});

  expect(store.getState().scratch.testScratchKey).toEqual({});

  container.unmount();

  expect(store.getState().scratch.testScratchKey).toBeUndefined();
});

it('moves the scratch contents when the scratch key changes', () => {
  wrapComponent(computeScratchKey, jest.fn(() => ({})), {});

  expect(store.getState().scratch.testScratchKey).toEqual({});

  store.dispatch(createScratch('scratchKeySpecial'));
  store.dispatch(updateScratch('scratchKeySpecial', {keyName: 'something'}));

  expect(store.getState().scratch.testScratchKey).toBeUndefined();
  expect(store.getState().scratch.something).toEqual({});
});

it('passes bound action creators to the wrapped component', () => {
  jest.spyOn(store, 'dispatch').mockImplementation(jest.fn());

  const updateFoo = jest.fn((someArg) => `blah${someArg}`);
  const testComponent = wrapComponent(computeScratchKey, jest.fn(() => ({})), {updateFoo});

  testComponent.prop('updateFoo')('boo');

  expect(store.dispatch).toHaveBeenCalledWith('blahboo');
});
