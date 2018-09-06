import React from 'react';
import {shallow} from 'enzyme';

import createAppStore from 'src/create_app_store';
import ModalLinkContainer from 'src/_common/containers/modal_link';

const props = {
  children: 'foo child',
  modalName: 'help',
  store: createAppStore(),
};

it('wraps the ModalLink component', () => {
  const container = shallow(<ModalLinkContainer {...props} />);

  expect(container.find('ModalLink')).toHaveLength(1);
});
