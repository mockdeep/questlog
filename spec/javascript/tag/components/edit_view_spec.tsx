import React from "react";
import {shallow} from "enzyme";

import type {Props} from "src/tag/components/edit_view";
import TagEditView from "src/tag/components/edit_view";

import {makeTag} from "_test_helpers/factories";

const tag = makeTag();
const props: Props = {tag};
const defaultRule = {field: "estimateSeconds", check: "isBlank"};

it("renders nothing when tag is not present", () => {
  const overrides = {...props, tag: undefined};
  const component = shallow(<TagEditView {...overrides} />);

  expect(component.type()).toBeNull();
});

it("updates when props update with new tag", () => {
  const overrides = {...props, tag: undefined};
  const component = shallow(<TagEditView {...overrides} />);

  expect(component.type()).toBeNull();

  component.setProps({tag});

  expect(component.type()).toBe("div");
});

it("renders rule rows", () => {
  const tempRules: TagRule[] = [{field: "tagIds", check: "isEmpty"}];
  const overrides = {...props, tag: {...tag, rules: tempRules}};
  const component = shallow(<TagEditView {...overrides} />);

  expect(component.find("RuleRow")).toHaveProp("rule", tempRules[0]);
});

it("adds rules when \"Add Rule\" button is clicked", () => {
  const component = shallow(<TagEditView {...props} />);

  expect(component.find("RuleRow")).not.toExist();
  const addRuleButton = component.find({value: "Add Rule"});

  expect(addRuleButton).toExist();
  addRuleButton.simulate("click");
  expect(component.find("RuleRow")).toHaveProp("rule", defaultRule);
});
