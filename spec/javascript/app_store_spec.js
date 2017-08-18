import appStore from 'src/app_store';

describe('appStore', () => {
  it('behaves like a store', () => {
    const expectedState = {
      user: {},
      notification: {task: null},
      route: {name: 'root', params: {}},
      scratch: {},
      tag: {byId: {}, orderedIds: [], meta: {}},
      task: {
        byId: {},
        orderedIds: [],
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
    appStore.dispatch({type: '@@redux/INIT'});
    expect(subSpy).toHaveBeenCalled();
  });
});
