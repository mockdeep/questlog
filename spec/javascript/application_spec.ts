vi.mock("react-dom");
vi.mock("controllers/index", () => { return {}; });
vi.mock("@hotwired/turbo-rails");
import "javascript/application";

it("sets up the application", () => {
  expect(window.jQuery).not.toBeUndefined();
});
