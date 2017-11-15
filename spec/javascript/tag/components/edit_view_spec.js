import React from 'react';
import {shallow} from 'enzyme';

import TagEditView from 'src/tag/components/edit_view';

const props = {
  tag: {},
  setRoute: jest.fn(),
  updateTag: jest.fn(),
  updateScratch: jest.fn(),
  scratch: {rules: []},
};
const defaultRule = {field: 'estimateSeconds', check: 'isBlank'};

it('renders rule rows', () => {
  const tempRules = [{field: 'title', check: 'isWobbly'}];
  const overrideProps = {...props, scratch: {rules: tempRules}};
  const component = shallow(<TagEditView {...overrideProps} />);

  expect(component.find('RuleRow')).toBePresent();
});

it('adds rules when "Add Rule" button is clicked', () => {
  const component = shallow(<TagEditView {...props} />);

  expect(component.find('RuleRow')).toBeEmpty();
  const addRuleButton = component.find({value: 'Add Rule'});

  expect(addRuleButton).toBePresent();
  addRuleButton.simulate('click');
  expect(props.updateScratch).toHaveBeenCalledWith({rules: [defaultRule]});
});
