import {render, screen} from "@testing-library/react";

import type {Props} from "javascript/tag/components/buttons";
import TagButtons from "javascript/tag/components/buttons";

import {makeTag, makeTask} from "_test_helpers/factories";

const tags = [
  makeTag({name: "home", slug: "home", tasks: [makeTask()]}),
  makeTag({name: "work", slug: "work", tasks: [makeTask(), makeTask()]}),
];
const props: Props = {tags, currentTagIds: []};

it("renders tag buttons", () => {
  render(<TagButtons {...props} />);

  expect(screen.getByRole("link", {name: /home/u})).toBeInTheDocument();
  expect(screen.getByRole("link", {name: /work/u})).toBeInTheDocument();
});

it("passes down active when tag slug matches the selected tag slug", () => {
  render(<TagButtons {...props} selectedTagSlug={"work"} />);

  expect(screen.getByRole("link", {name: /home/u})).not.toHaveClass("active");
  expect(screen.getByRole("link", {name: /work/u})).toHaveClass("active");
});
