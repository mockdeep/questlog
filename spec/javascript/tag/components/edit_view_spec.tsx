import React from 'react';
import {shallow} from 'enzyme';

import TagEditView, {Props} from 'src/tag/components/edit_view';

import {makeTag} from '_test_helpers/factories';

const tag = makeTag();
type Payload = {rules: TagRule[]};
const updateTag = jest.fn((id: number, payload: Payload) => Promise.resolve());
const props: Props = {
  tag,
  setRoute: jest.fn(),
  updateTag,
};
const defaultRule = {field: 'estimateSeconds', check: 'isBlank'};

it('renders nothing when tag is not present', () => {
  const overrides = {...props, tag: undefined};
  const component = shallow(<TagEditView {...overrides} />);

  expect(component.type()).toBeNull();
});

it('updates when props update with new tag', () => {
  const overrides = {...props, tag: undefined};
  const component = shallow(<TagEditView {...overrides} />);

  expect(component.type()).toBeNull();

  component.setProps({tag});

  expect(component.type()).toBe('div');
});

it('renders rule rows', () => {
  const tempRules = [{field: 'title', check: 'isWobbly'}];
  const overrides = {...props, tag: {...tag, rules: tempRules}};
  const component = shallow(<TagEditView {...overrides} />);

  expect(component.find('RuleRow')).toHaveProp('rule', tempRules[0]);
});

it('adds rules when "Add Rule" button is clicked', () => {
  const component = shallow(<TagEditView {...props} />);

  expect(component.find('RuleRow')).not.toExist();
  const addRuleButton = component.find({value: 'Add Rule'});

  expect(addRuleButton).toExist();
  addRuleButton.simulate('click');
  expect(component.find('RuleRow')).toHaveProp('rule', defaultRule);
});

it('saves the tag on submit', () => {
  const tempRules = [{field: 'title', check: 'isWobbly'}];
  const overrides = {...props, tag: {...tag, rules: tempRules}};
  const component = shallow(<TagEditView {...overrides} />);
  const preventDefault = jest.fn();
  const fakeEvent = {preventDefault};

  component.find('form').simulate('submit', fakeEvent);

  expect(preventDefault).toHaveBeenCalled();
  expect(updateTag).toHaveBeenCalledWith(tag.id, {rules: tempRules});
});
