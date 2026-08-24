import type {ReactElement} from "react";
import {fireEvent, render, screen} from "@testing-library/react";

import {ensure} from "helpers/ensure";

import TagEditView from "javascript/tag/components/edit_view";

import {makeRuleFields, makeTag} from "support/factories";

function view(tag: Tag): ReactElement {
  return <TagEditView tag={tag} ruleFields={makeRuleFields()} />;
}

it("does not reset rules when re-rendered", () => {
  const {rerender} = render(view(makeTag()));
  fireEvent.click(screen.getByDisplayValue("Add Rule"));

  expect(screen.getByDisplayValue("Estimate Seconds")).toBeInTheDocument();

  rerender(view(makeTag()));

  expect(screen.getByDisplayValue("Estimate Seconds")).toBeInTheDocument();
});

it("renders rule rows", () => {
  const rules: TagRule[] = [{field: "tagIds", check: "isEmpty"}];
  render(view(makeTag({rules})));

  expect(screen.getByDisplayValue("Tags")).toBeInTheDocument();
});

it("adds rules when \"Add Rule\" button is clicked", () => {
  render(view(makeTag()));

  const result = screen.queryByDisplayValue("Estimate Seconds");
  expect(result).not.toBeInTheDocument();
  const addRuleButton = screen.getByDisplayValue("Add Rule");

  expect(addRuleButton).toBeInTheDocument();
  fireEvent.click(addRuleButton);
  expect(screen.getByDisplayValue("Estimate Seconds")).toBeInTheDocument();
});

it("updates a rule's field when its select changes", () => {
  const rules: TagRule[] = [{field: "estimateSeconds", check: "isBlank"}];
  render(view(makeTag({rules})));

  fireEvent.change(screen.getByDisplayValue("Estimate Seconds"), {
    target: {value: "tagIds"},
  });

  expect(screen.getByDisplayValue("Tags")).toBeInTheDocument();
});

it("deletes a rule when its remove icon is clicked", () => {
  const rules: TagRule[] = [{field: "tagIds", check: "isEmpty"}];
  const {container} = render(view(makeTag({rules})));

  expect(screen.getByDisplayValue("Tags")).toBeInTheDocument();

  fireEvent.click(ensure(container.querySelector("i.fa-times")));

  expect(screen.queryByDisplayValue("Tags")).not.toBeInTheDocument();
});
