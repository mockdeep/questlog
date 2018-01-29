import React from 'react';
import {shallow} from 'enzyme';

import AlphaModal from 'src/_common/components/alpha_modal';

const props = {
  closeModal: jest.fn(),
  isOpen: true,
};

it('renders a modal with alpha description', () => {
  const component = shallow(<AlphaModal {...props} />);
  const modal = component.find('Modal');
  const modalContent = shallow(<span>{modal.prop('children')}</span>);

  expect(modal).toHaveProp('isOpen', true);
  expect(modalContent).toIncludeText('under active development');
});
