'use strict';

// jest.mock('js/_config/routes', () => {poo: 'boogers'});
import {shallow} from 'enzyme';

import router from 'js/router';

describe('router', () => {
  it('renders routes', () => {
    const wrapper = shallow(router);

    expect(wrapper.find('Router')).toBeTruthy();
  });
});
