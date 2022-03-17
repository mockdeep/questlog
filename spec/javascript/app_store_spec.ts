import appStore from 'src/app_store';

describe('appStore', () => {
  it('behaves like a store', () => {
    const expectedState = {
      user: {},
      notification: {},
      route: {params: {}},
      tag: {byId: {}, meta: {}},
      task: {
        byId: {},
        meta: {
          postponeSeconds: 300,
          newTask: {title: ''},
          ajaxState: 'loading',
        },
      },
    };
    const subSpy = jest.fn();

    expect(appStore.getState()).toEqual(expectedState);

    appStore.subscribe(subSpy);
    appStore.dispatch({type: 'task/INIT'});
    expect(subSpy).toHaveBeenCalled();
  });
});
