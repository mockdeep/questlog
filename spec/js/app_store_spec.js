import appStore from 'js/app_store';

describe('appStore', () => {
  it('behaves like a store', () => {
    const expectedState = {
      user: {},
      notification: {task: null},
      task: {newTask: {title: ''}},
    };
    const subSpy = jest.fn();

    expect(appStore.getState()).toEqual(expectedState);

    appStore.subscribe(subSpy);
    appStore.dispatch({type: '@@redux/INIT'});
    expect(subSpy).toHaveBeenCalled();
  });
});
