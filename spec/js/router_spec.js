import {shallow} from 'enzyme';

import router from 'js/router';

describe('router', () => {
  it('renders routes', () => {
    const wrapper = shallow(router);

    expect(wrapper.find('Router')).toBeTruthy();
  });
});
