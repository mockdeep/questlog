import A11yDialog from "a11y-dialog";
import {expect, it, vi} from "vitest";

import {bootStimulus} from "support/stimulus";
import DialogController from "controllers/dialog_controller";

async function setupController(): Promise<void> {
  document.body.innerHTML = "<div data-controller='dialog'></div>";

  await bootStimulus("dialog", DialogController);
}

it("shows an accessible dialog on connect", async () => {
  const showSpy = vi.spyOn(A11yDialog.prototype, "show");

  await setupController();

  expect(showSpy).toHaveBeenCalledWith();
});
