import {fireEvent, render, screen} from "@testing-library/react";

import type {Props} from "javascript/tag/components/edit_view";
import TagEditView from "javascript/tag/components/edit_view";

import {makeTag} from "support/factories";

const tag = makeTag();
const props: Props = {tag};

it("renders nothing when tag is not present", () => {
  const overrides = {...props, tag: undefined};
  const {container} = render(<TagEditView {...overrides} />);

  expect(container.firstChild).toBeNull();
});

it("updates when props update with new tag", () => {
  const overrides = {...props, tag: undefined};
  const {container, rerender} = render(<TagEditView {...overrides} />);

  expect(container.firstChild).toBeNull();

  rerender(<TagEditView {...props} />);

  expect(container.firstChild).not.toBeNull();
});

it("renders rule rows", () => {
  const tempRules: TagRule[] = [{field: "tagIds", check: "isEmpty"}];
  const overrides = {...props, tag: {...tag, rules: tempRules}};
  render(<TagEditView {...overrides} />);

  expect(screen.getByDisplayValue("Tags")).toBeInTheDocument();
});

it("adds rules when \"Add Rule\" button is clicked", () => {
  render(<TagEditView {...props} />);

  const result = screen.queryByDisplayValue("Estimate Seconds");
  expect(result).not.toBeInTheDocument();
  const addRuleButton = screen.getByDisplayValue("Add Rule");

  expect(addRuleButton).toBeInTheDocument();
  fireEvent.click(addRuleButton);
  expect(screen.getByDisplayValue("Estimate Seconds")).toBeInTheDocument();
});
