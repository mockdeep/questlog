jest.mock('src/_helpers/ajax', () => ({ajaxGet() { return {then: jest.fn()}; }}));
import {shallow} from 'enzyme';

import appBase from 'src/app_base';

it('renders routes', () => {
  const wrapper = shallow(appBase, {lifecycleExperimental: true});

  expect(wrapper.find('Router')).toBeTruthy();
});
