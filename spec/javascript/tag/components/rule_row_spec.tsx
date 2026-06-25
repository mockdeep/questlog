import {createRef} from "react";
import type {ChangeEvent} from "react";
import {fireEvent, render, screen} from "@testing-library/react";

import {ensure} from "helpers/ensure";

import RuleRow from "javascript/tag/components/rule_row";

const tagRule: TagRule = {check: "isBlank", field: "estimateSeconds"};
const props = {
  deleteRule: vi.fn(),
  index: 1,
  rule: tagRule,
  updateFieldValue: vi.fn(),
};

function fieldSelect(): HTMLElement {
  return ensure(screen.getAllByRole("combobox")[0]);
}

function checkSelect(): HTMLElement {
  return ensure(screen.getAllByRole("combobox")[1]);
}

/*
 * Capture a real, correctly-typed change event for a given select value, so
 * handlers can be called directly without a (forbidden) type assertion.
 */
function changeEvent(value: string): ChangeEvent<HTMLSelectElement> {
  let captured: ChangeEvent<HTMLSelectElement> | undefined;
  function capture(event: ChangeEvent<HTMLSelectElement>): void {
    captured = event;
  }
  const {unmount} = render(<select onChange={capture}>
    <option value={value} />
  </select>);

  fireEvent.change(screen.getByRole("combobox"), {target: {value}});
  unmount();

  return ensure(captured);
}

it("renders a select tag", () => {
  render(<RuleRow {...props} />);

  const selects = screen.getAllByRole("combobox");
  expect(selects).toHaveLength(2);
});

it("does not render a checks dropdown when the rule has no field", () => {
  const rule: TagRule = {check: "isBlank"};
  render(<RuleRow {...props} rule={rule} />);

  expect(screen.getAllByRole("combobox")).toHaveLength(1);
});

it("defaults the check to the first compatible check", () => {
  const rule: TagRule = {check: "isEmpty", field: "estimateSeconds"};
  render(<RuleRow {...props} rule={rule} />);

  expect(checkSelect()).toHaveValue("isBlank");
});

it("renders the checks for a tagIds rule", () => {
  const rule: TagRule = {check: "isEmpty", field: "tagIds"};
  render(<RuleRow {...props} rule={rule} />);

  expect(checkSelect()).toHaveValue("isEmpty");
  expect(screen.getByText("is empty")).toBeInTheDocument();
});

it("updates the field value when the field select changes", () => {
  render(<RuleRow {...props} />);

  fireEvent.change(fieldSelect(), {target: {value: "tagIds"}});

  expect(props.updateFieldValue).toHaveBeenCalledWith(1, "tagIds");
});

it("throws when the field is set to an unknown value", () => {
  const event = changeEvent("bogus");
  const ref = createRef<RuleRow>();
  render(<RuleRow {...props} ref={ref} />);

  expect(() => {
    ensure(ref.current).updateFieldValue(event);
  }).toThrow(/unknown rule field: bogus/u);
});

it("deletes the rule when the times icon is clicked", () => {
  const {container} = render(<RuleRow {...props} />);

  fireEvent.click(ensure(container.querySelector("i.fa-times")));

  expect(props.deleteRule).toHaveBeenCalledWith(1);
});
