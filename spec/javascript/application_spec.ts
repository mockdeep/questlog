vi.mock("react-dom");
vi.mock("controllers/index", () => { return {}; });
vi.mock("@hotwired/turbo-rails");
import "javascript/application";
import {session} from "@hotwired/turbo";

it("disables Turbo", () => {
  expect(session.drive).toBe(false);
});
