import React from 'react';
import {act} from 'react-dom/test-utils';
import {mount, ReactWrapper} from 'enzyme';
import {ActionCreator, Action} from 'redux';

import connectWithScratch from 'src/scratch/connect_with_scratch';
import createAppStore from 'src/create_app_store';
import {createScratch, updateScratch} from 'src/scratch/action_creators';

let container: ReactWrapper;
let store = createAppStore();

type TestProps = {
  updateFoo?: Function;
  updateScratch: Function;
  someProp?: string;
};

function computeKey(state: ScratchState) {
  const {scratchKeySpecial} = state.scratch;
  if (scratchKeySpecial && scratchKeySpecial.keyName) {
    return scratchKeySpecial.keyName;
  }

  return 'testScratchKey';
}

function TestComponent(props: TestProps) {
  return <div>{`Hello ${props}`}</div>;
}

function wrapComponent(
  computeScratchKey: (state: ScratchState, props: TestProps) => string,
  mapStateToProps: (state: ScratchState, props: TestProps) => any,
  actionCreators: {[name: string]: ActionCreator<Action>},
) {
  const connector = connectWithScratch(
    computeScratchKey,
    mapStateToProps,
    actionCreators,
  );
  const WrappedComponent = connector(TestComponent);

  container = mount(<WrappedComponent store={store} someProp={'fooProp'} />);

  return container.find(TestComponent);
}

beforeEach(() => { store = createAppStore(); });

it('passes props mapped from state down to the wrapped component', () => {
  function mapStateToProps(state: ScratchState) {
    return {
      dooble: 'dobble',
      propFromState: state.scratch.oneTest.taskTitle,
    };
  }

  store.dispatch(createScratch('oneTest'));
  store.dispatch(updateScratch('oneTest', {taskTitle: 'something'}));

  const testComponent = wrapComponent(computeKey, mapStateToProps, {});

  expect(testComponent).toHaveProp('dooble', 'dobble');
  expect(testComponent).toHaveProp('propFromState', 'something');
});

it('passes ownProps through', () => {
  function mapStateToProps(state: ScratchState, ownProps: TestProps) {
    return {
      dooble: 'dobble',
      propsFromProps: ownProps.someProp,
    };
  }

  const testComponent = wrapComponent(computeKey, mapStateToProps, {});

  expect(testComponent).toHaveProp('propsFromProps', 'fooProp');
});

it('creates a new scratch space based on the given key', () => {
  expect(store.getState().scratch.testScratchKey).toBeUndefined();

  wrapComponent(computeKey, jest.fn(() => ({})), {});

  expect(store.getState().scratch.testScratchKey).toEqual({});
});

it('passes a bound updateScratch down to the wrapped component', () => {
  const testComponent = wrapComponent(computeKey, jest.fn(() => ({})), {});

  expect(store.getState().scratch.testScratchKey).toEqual({});

  const updateScratchProp = testComponent.prop('updateScratch');

  expect(updateScratchProp).toBeInstanceOf(Function);

  act(() => {
    updateScratchProp({stooble: 'stobble'});
  });

  expect(store.getState().scratch.testScratchKey).toEqual({stooble: 'stobble'});
});

// it('passes the scratch state down to the wrapped component', () => {
//   let testComponent = wrapComponent(computeKey, jest.fn(() => ({})), {});

//   expect(testComponent).toHaveProp('scratch', {});

//   act(() => {
//     store.dispatch(updateScratch('testScratchKey', {taskTitle: 'somethin'}));
//     container.update();
//   });

//   testComponent = container.find(TestComponent);
//   expect(testComponent).toHaveProp('scratch', {taskTitle: 'somethin'});
// });

it('removes the scratch key when the component is unmounted', () => {
  wrapComponent(computeKey, jest.fn(() => ({})), {});

  expect(store.getState().scratch.testScratchKey).toEqual({});

  container.unmount();

  expect(store.getState().scratch.testScratchKey).toBeUndefined();
});

it('moves the scratch contents when the scratch key changes', () => {
  wrapComponent(computeKey, jest.fn(() => ({})), {});

  expect(store.getState().scratch.testScratchKey).toEqual({});

  act(() => {
    store.dispatch(createScratch('scratchKeySpecial'));
    store.dispatch(updateScratch('scratchKeySpecial', {keyName: 'something'}));
  });

  expect(store.getState().scratch.testScratchKey).toBeUndefined();
  expect(store.getState().scratch.something).toEqual({});
});

it('passes bound action creators to the wrapped component', () => {
  jest.spyOn(store, 'dispatch').mockImplementation(jest.fn());

  const updateFoo = jest.fn(someArg => `blah${someArg}`);
  const testComponent = wrapComponent(
    computeKey,
    jest.fn(() => ({})),
    {updateFoo}
  );

  testComponent.prop('updateFoo')('boo');

  expect(store.dispatch).toHaveBeenCalledWith('blahboo');
});
