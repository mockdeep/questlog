import React from 'react';
import {shallow} from 'enzyme';

import TagEditView from 'src/tag/components/edit_view';

import {makeTag} from '_test_helpers/factories';

const updateScratch = jest.fn();
const props = {
  tag: {},
  setRoute: jest.fn(),
  updateTag: jest.fn(),
  updateScratch,
  scratch: {rules: []},
};
const defaultRule = {field: 'estimateSeconds', check: 'isBlank'};

it('renders rule rows', () => {
  const tempRules = [{field: 'title', check: 'isWobbly'}];
  const overrides = {...props, scratch: {rules: tempRules}};
  const component = shallow(<TagEditView {...overrides} />);

  expect(component.find('RuleRow')).toBePresent();
});

it('adds rules when "Add Rule" button is clicked', () => {
  const component = shallow(<TagEditView {...props} />);

  expect(component.find('RuleRow')).toBeEmpty();
  const addRuleButton = component.find({value: 'Add Rule'});

  expect(addRuleButton).toBePresent();
  addRuleButton.simulate('click');
  expect(updateScratch).toHaveBeenCalledWith({rules: [defaultRule]});
});

it('updates rules when component receives a new tag', () => {
  const component = shallow(<TagEditView {...props} />);
  const tag = makeTag({rules: [{field: 'title', check: 'isWobbly'}]});

  component.setProps({tag});

  expect(updateScratch).toHaveBeenCalledWith({rules: tag.rules});
});
