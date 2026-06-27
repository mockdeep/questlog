import {fireEvent, render, screen} from "@testing-library/react";

import {ensure} from "helpers/ensure";

import type {Props} from "javascript/tag/components/edit_view";
import TagEditView from "javascript/tag/components/edit_view";

import {makeTag} from "support/factories";

const tag = makeTag();
const props: Props = {tag};
const DUPLICATE_PROMPT = "There are duplicate rules. Remove extras?";

function preventDefault(event: Event): void {
  event.preventDefault();
}

function submitForm(container: HTMLElement): void {
  const form = ensure(container.querySelector("form"));
  form.addEventListener("submit", preventDefault);

  fireEvent.submit(form);
}

function submitPrevented(container: HTMLElement): boolean {
  const form = ensure(container.querySelector("form"));
  const event = new Event("submit", {bubbles: true, cancelable: true});
  form.dispatchEvent(event);

  return event.defaultPrevented;
}

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

it("renders nothing again when the tag is removed", () => {
  const {container, rerender} = render(<TagEditView {...props} />);

  expect(container.firstChild).not.toBeNull();

  rerender(<TagEditView {...props} tag={undefined} />);

  expect(container.firstChild).toBeNull();
});

it("does not reset rules when re-rendered with the same tag", () => {
  const localProps: Props = {tag: makeTag()};
  const {rerender} = render(<TagEditView {...localProps} />);
  fireEvent.click(screen.getByDisplayValue("Add Rule"));

  expect(screen.getByDisplayValue("Estimate Seconds")).toBeInTheDocument();

  rerender(<TagEditView {...localProps} />);

  expect(screen.getByDisplayValue("Estimate Seconds")).toBeInTheDocument();
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

it("updates a rule's field when its select changes", () => {
  const rules: TagRule[] = [{field: "estimateSeconds", check: "isBlank"}];
  render(<TagEditView {...props} tag={{...tag, rules}} />);

  fireEvent.change(screen.getByDisplayValue("Estimate Seconds"), {
    target: {value: "tagIds"},
  });

  expect(screen.getByDisplayValue("Tags")).toBeInTheDocument();
});

it("deletes a rule when its remove icon is clicked", () => {
  const rules: TagRule[] = [{field: "tagIds", check: "isEmpty"}];
  const {container} = render(<TagEditView {...props} tag={{...tag, rules}} />);

  expect(screen.getByDisplayValue("Tags")).toBeInTheDocument();

  fireEvent.click(ensure(container.querySelector("i.fa-times")));

  expect(screen.queryByDisplayValue("Tags")).not.toBeInTheDocument();
});

it("prompts to remove duplicates when saving duplicate rules", () => {
  const rule: TagRule = {field: "tagIds", check: "isEmpty"};
  const dupTag = {...tag, rules: [rule, {...rule}]};
  const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true);
  const {container} = render(<TagEditView {...props} tag={dupTag} />);

  submitForm(container);

  expect(confirmSpy).toHaveBeenCalledWith(DUPLICATE_PROMPT);
});

it("blocks the save when the duplicate prompt is declined", () => {
  const rule: TagRule = {field: "tagIds", check: "isEmpty"};
  const dupTag = {...tag, rules: [rule, {...rule}]};
  vi.spyOn(window, "confirm").mockReturnValue(false);
  const {container} = render(<TagEditView {...props} tag={dupTag} />);

  expect(submitPrevented(container)).toBe(true);
});

it("does not prompt on save when there are no duplicate rules", () => {
  const rules: TagRule[] = [{field: "tagIds", check: "isEmpty"}];
  const confirmSpy = vi.spyOn(window, "confirm");
  const {container} = render(<TagEditView {...props} tag={{...tag, rules}} />);

  submitForm(container);

  expect(confirmSpy).not.toHaveBeenCalled();
});
