import {expect, it, vi} from "vitest";

import {application} from "controllers/application";

it("registers the stimulus controllers on the application", async () => {
  const registerSpy = vi.spyOn(application, "register");

  await import("controllers/index");

  expect(registerSpy).toHaveBeenCalledWith("layout", expect.anything());
  expect(registerSpy).toHaveBeenCalledWith("react", expect.anything());

  application.stop();
});
