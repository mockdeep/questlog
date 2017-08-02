import React from 'react';
import {shallow} from 'enzyme';

import TagEditForm from 'src/tag/components/edit_form';

const props = {
  tag: {},
  setRoute: jest.fn(),
  updateTag: jest.fn(),
  updateScratch: jest.fn(),
  scratch: {rules: []},
};
const defaultRule = {field: 'estimateSeconds', check: 'isBlank'};
const renderOpts = {lifecycleExperimental: true};

it('renders rule rows', () => {
  const tempRules = [{field: 'title', check: 'isWobbly'}];
  const overrideProps = {...props, scratch: {rules: tempRules}};
  const component = shallow(<TagEditForm {...overrideProps} />, renderOpts);

  expect(component.find('RuleRow')).toHaveLength(1);
});

it('adds rules when "Add Rule" button is clicked', () => {
  const component = shallow(<TagEditForm {...props} />, renderOpts);

  expect(component.find('RuleRow')).toHaveLength(0);
  const addRuleButton = component.find({value: 'Add Rule'});

  expect(addRuleButton).toHaveLength(1);
  addRuleButton.simulate('click');
  expect(props.updateScratch).toHaveBeenCalledWith({rules: [defaultRule]});
});
