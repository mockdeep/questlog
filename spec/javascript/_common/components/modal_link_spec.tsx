import React from 'react';
import {shallow} from 'enzyme';

import ModalLink, {Props} from 'src/_common/components/modal_link';

const updateCommon = jest.fn();
const props: Props = {
  children: 'help text',
  modalName: 'alpha',
  updateCommon,
};

it('updates the modal state to open when button is clicked', () => {
  const component = shallow(<ModalLink {...props} />);
  const modalId = (component.instance() as ModalLink).modalId;

  component.find('button').simulate('click');

  expect(updateCommon).toHaveBeenCalledWith({openModalId: modalId});
});

it('applies a given className to the wrapper span', () => {
  const component = shallow(<ModalLink {...props} className={'my-class'} />);

  expect(component.find('span')).toHaveProp('className', 'my-class');
});
