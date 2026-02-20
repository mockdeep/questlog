import {render, screen} from "@testing-library/react";

import type {Props} from "javascript/tag/components/button";
import TagButton from "javascript/tag/components/button";

import {makeTag} from "_test_helpers/factories";

const tag = makeTag({slug: "home", name: "Home"});
const props: Props = {
  current: false,
  tag,
  isActive: false,
};

it("adds an active class when tag is selected", () => {
  render(<TagButton {...props} isActive />);

  expect(screen.getByRole("link")).toHaveClass("active");
});

it("adds a current class when tag current", () => {
  render(<TagButton {...props} current />);

  expect(screen.getByRole("link")).toHaveClass("current");
});

it("adds a priority class when tag has a priority", () => {
  const overrides = {tag: {...tag, priority: 2}};
  render(<TagButton {...props} {...overrides} />);

  expect(screen.getByRole("link")).toHaveClass("priority-2-btn");
});

it("renders a link with a path for a tag", () => {
  render(<TagButton {...props} />);

  expect(screen.getByRole("link")).toHaveAttribute("href", "/tags/home");
});

it("renders a link with the root path when name is \"All\"", () => {
  const overrides = {tag: {...tag, name: "All", slug: ""}};
  render(<TagButton {...props} {...overrides} />);

  expect(screen.getByRole("link")).toHaveAttribute("href", "/");
});
