import {fireEvent, render, screen} from "@testing-library/react";

import {ensure} from "helpers/ensure";

import TagEditView from "javascript/tag/components/edit_view";

import {makeTag} from "support/factories";

it("does not reset rules when re-rendered", () => {
  const {rerender} = render(<TagEditView tag={makeTag()} />);
  fireEvent.click(screen.getByDisplayValue("Add Rule"));

  expect(screen.getByDisplayValue("Estimate Seconds")).toBeInTheDocument();

  rerender(<TagEditView tag={makeTag()} />);

  expect(screen.getByDisplayValue("Estimate Seconds")).toBeInTheDocument();
});

it("renders rule rows", () => {
  const rules: TagRule[] = [{field: "tagIds", check: "isEmpty"}];
  render(<TagEditView tag={makeTag({rules})} />);

  expect(screen.getByDisplayValue("Tags")).toBeInTheDocument();
});

it("adds rules when \"Add Rule\" button is clicked", () => {
  render(<TagEditView tag={makeTag()} />);

  const result = screen.queryByDisplayValue("Estimate Seconds");
  expect(result).not.toBeInTheDocument();
  const addRuleButton = screen.getByDisplayValue("Add Rule");

  expect(addRuleButton).toBeInTheDocument();
  fireEvent.click(addRuleButton);
  expect(screen.getByDisplayValue("Estimate Seconds")).toBeInTheDocument();
});

it("updates a rule's field when its select changes", () => {
  const rules: TagRule[] = [{field: "estimateSeconds", check: "isBlank"}];
  render(<TagEditView tag={makeTag({rules})} />);

  fireEvent.change(screen.getByDisplayValue("Estimate Seconds"), {
    target: {value: "tagIds"},
  });

  expect(screen.getByDisplayValue("Tags")).toBeInTheDocument();
});

it("deletes a rule when its remove icon is clicked", () => {
  const rules: TagRule[] = [{field: "tagIds", check: "isEmpty"}];
  const {container} = render(<TagEditView tag={makeTag({rules})} />);

  expect(screen.getByDisplayValue("Tags")).toBeInTheDocument();

  fireEvent.click(ensure(container.querySelector("i.fa-times")));

  expect(screen.queryByDisplayValue("Tags")).not.toBeInTheDocument();
});
