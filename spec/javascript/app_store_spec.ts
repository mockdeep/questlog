import appStore from 'src/app_store';

describe('appStore', () => {
  it('behaves like a store', () => {
    const expectedState = {
      route: {params: {}},
      tag: {byId: {}, meta: {}},
      task: {
        byId: {},
        meta: {postponeSeconds: 300, ajaxState: 'loading'},
      },
    };
    const subSpy = vi.fn();

    expect(appStore.getState()).toEqual(expectedState);

    appStore.subscribe(subSpy);
    appStore.dispatch({type: 'task/INIT'});
    expect(subSpy).toHaveBeenCalled();
  });
});
