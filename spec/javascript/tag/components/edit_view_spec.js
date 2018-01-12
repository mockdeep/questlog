import React from 'react';
import {shallow} from 'enzyme';

import TagEditView from 'src/tag/components/edit_view';

import {makeTag} from '_test_helpers/factories';

const tag = makeTag();
const updateScratch = jest.fn();
const updateTag = jest.fn(() => Promise.resolve());
const props = {
  tag,
  setRoute: jest.fn(),
  updateTag,
  updateScratch,
  scratch: {rules: []},
};
const defaultRule = {field: 'estimateSeconds', check: 'isBlank'};

it('renders null when there is no tag', () => {
  const component = shallow(<TagEditView {...props} tag={null} />);

  expect(component.type()).toBeNull();
});

it('renders null when scratch rules are not present', () => {
  const component = shallow(<TagEditView {...props} scratch={{}} />);

  expect(component.type()).toBeNull();
});

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
  const newTag = makeTag({rules: [{field: 'title', check: 'isWobbly'}]});

  component.setProps({tag: newTag});

  expect(updateScratch).toHaveBeenCalledWith({rules: newTag.rules});
});

it('saves the tag on submit', () => {
  const tempRules = [{field: 'title', check: 'isWobbly'}];
  const overrides = {...props, scratch: {rules: tempRules}};
  const component = shallow(<TagEditView {...overrides} />);
  const preventDefault = jest.fn();
  const fakeEvent = {preventDefault};

  component.find('form').simulate('submit', fakeEvent);

  expect(preventDefault).toHaveBeenCalled();
  expect(updateTag).toHaveBeenCalledWith(tag.id, {rules: tempRules});
});
