import {noop} from "lodash";
import {expect, it, vi} from "vitest";

import {bootStimulus} from "support/stimulus";
import {ensure} from "helpers/ensure";
import AutoSubmitController from "controllers/auto_submit_controller";

async function setup(): Promise<HTMLInputElement> {
  document.body.innerHTML =
    "<form data-controller=\"auto-submit\" " +
    "data-action=\"change->auto-submit#submit\">" +
    "<input type=\"checkbox\">" +
    "</form>";

  await bootStimulus("auto-submit", AutoSubmitController);

  return ensure(document.querySelector<HTMLInputElement>("input"));
}

it("submits the form when one of its inputs changes", async () => {
  const requestSubmit = vi
    .spyOn(HTMLFormElement.prototype, "requestSubmit")
    .mockImplementation(noop);
  const checkbox = await setup();

  checkbox.click();

  expect(requestSubmit).toHaveBeenCalledTimes(1);
});
