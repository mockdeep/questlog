vi.mock("react-dom");
vi.mock("controllers/index");
vi.mock("@hotwired/turbo-rails");

import "src/application";
import {debug} from "helpers";

it("sets debug as a global", () => {
  expect(window.debug).toBe(debug);
});
