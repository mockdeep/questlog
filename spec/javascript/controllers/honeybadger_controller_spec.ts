import {describe, expect, it, vi} from "vitest";
import Honeybadger from "@honeybadger-io/js";

import {bootStimulus} from "support/stimulus";
import HoneybadgerController from "controllers/honeybadger_controller";

async function setupController(userId: string): Promise<void> {
  document.body.innerHTML = `
    <div
      data-controller="honeybadger"
      data-honeybadger-api-key-value="hb-api-key"
      data-honeybadger-environment-value="test"
      ${userId}
    ></div>
  `;

  await bootStimulus("honeybadger", HoneybadgerController);
}

describe("honeybadgerController", () => {
  it("configures Honeybadger from the element's values", async () => {
    const configureSpy =
      vi.spyOn(Honeybadger, "configure").mockReturnThis();

    await setupController("");

    expect(configureSpy).toHaveBeenCalledWith({
      apiKey: "hb-api-key",
      environment: "test",
    });
  });

  it("sets the current user id as context", async () => {
    const setContextSpy =
      vi.spyOn(Honeybadger, "setContext").mockReturnThis();

    await setupController("data-honeybadger-user-id-value=\"42\"");

    expect(setContextSpy).toHaveBeenCalledWith({userId: 42});
  });

  it("sets no context for a guest with no user id", async () => {
    const setContextSpy =
      vi.spyOn(Honeybadger, "setContext").mockReturnThis();

    await setupController("");

    expect(setContextSpy).not.toHaveBeenCalled();
  });
});
