jest.mock('reqwest');

import {shallow} from 'enzyme';

import router from 'src/router';

describe('router', () => {
  it('renders routes', () => {
    const wrapper = shallow(router, {lifecycleExperimental: true});

    expect(wrapper.find('Router')).toBeTruthy();
  });
});
