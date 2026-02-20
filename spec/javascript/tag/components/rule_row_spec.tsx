import {render, screen} from "@testing-library/react";

import RuleRow from "javascript/tag/components/rule_row";

const tagRule: TagRule = {field: "estimateSeconds", check: "isBlank"};
const props = {
  deleteRule: vi.fn(),
  index: 1,
  rule: tagRule,
  updateFieldValue: vi.fn(),
};

it("renders a select tag", () => {
  render(<RuleRow {...props} />);

  const selects = screen.getAllByRole("combobox");
  expect(selects).toHaveLength(2);
});
