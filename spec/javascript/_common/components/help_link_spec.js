import React from 'react';
import {shallow} from 'enzyme';

import HelpLink from 'src/_common/components/help_link';

const updateCommon = jest.fn();
const props = {helpModalOpen: false, updateCommon};

it('renders a link to the help dialog', () => {
  const component = shallow(<HelpLink {...props} />);

  expect(component).toIncludeText('Help');
  expect(component.find('HelpModal')).toBePresent();
});

it('updates the modal state to open when button is clicked', () => {
  const component = shallow(<HelpLink {...props} />);

  component.find('button').simulate('click');

  expect(updateCommon).toHaveBeenCalledWith({helpModalOpen: true});
});

it('updates the modal state to closed when closeModal is triggered', () => {
  const component = shallow(<HelpLink {...props} />);
  const stopPropagation = jest.fn();

  component.find('HelpModal').prop('closeModal')({stopPropagation});

  expect(stopPropagation).toHaveBeenCalled();
  expect(updateCommon).toHaveBeenCalledWith({helpModalOpen: false});
});
