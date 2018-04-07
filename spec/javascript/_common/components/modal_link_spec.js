import React from 'react';
import {shallow} from 'enzyme';

import ModalLink from 'src/_common/components/modal_link';

const updateCommon = jest.fn();
const props = {
  children: 'help text',
  modalName: 'help',
  updateCommon,
};

it('renders a link to the help dialog', () => {
  const component = shallow(<ModalLink {...props} />);

  expect(component).toIncludeText('help text');
  expect(component.find('HelpModal')).toExist();
});

it('updates the modal state to open when button is clicked', () => {
  const component = shallow(<ModalLink {...props} />);
  const modalId = component.instance().modalId;

  component.find('button').simulate('click');

  expect(updateCommon).toHaveBeenCalledWith({openModalId: modalId});
});

it('updates the modal state to closed when closeModal is triggered', () => {
  const component = shallow(<ModalLink {...props} />);
  const stopPropagation = jest.fn();

  component.find('HelpModal').prop('closeModal')({stopPropagation});

  expect(stopPropagation).toHaveBeenCalled();
  expect(updateCommon).toHaveBeenCalledWith({openModalId: null});
});

it('applies a given className to the wrapper span', () => {
  const component = shallow(<ModalLink {...props} className={'my-class'} />);

  expect(component.find('span')).toHaveProp('className', 'my-class');
});
