import {render, screen} from "@testing-library/react";

import {makeTask} from "_test_helpers/factories";

import type {Props} from "javascript/task/components/postpone_button";
import PostponeButton from "javascript/task/components/postpone_button";

const props: Props = {
  disabled: false,
  postponeTask: vi.fn(),
  storePostponeSeconds: vi.fn(),
  task: makeTask(),
};

it("renders a select tag", () => {
  render(<PostponeButton {...props} />);

  expect(screen.getByRole("combobox")).toBeInTheDocument();
});
