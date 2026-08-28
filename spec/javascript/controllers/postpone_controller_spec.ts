import {noop} from "lodash";
import {expect, it, vi} from "vitest";

import {bootStimulus} from "support/stimulus";
import {ensure} from "helpers/ensure";
import PostponeController from "controllers/postpone_controller";

async function setup(): Promise<HTMLFormElement> {
  document.body.innerHTML =
    "<form data-controller=\"postpone\" " +
    "data-action=\"click->postpone#submit\">" +
    "<label>Postpone for:</label>" +
    "<select><option value=\"300\">5 minutes</option></select>" +
    "</form>";

  await bootStimulus("postpone", PostponeController);

  return ensure(document.querySelector<HTMLFormElement>("form"));
}

it("postpones the task when the button is clicked", async () => {
  const requestSubmit = vi
    .spyOn(HTMLFormElement.prototype, "requestSubmit")
    .mockImplementation(noop);
  const form = await setup();

  ensure(form.querySelector<HTMLLabelElement>("label")).click();

  expect(requestSubmit).toHaveBeenCalledTimes(1);
});

it("leaves the task alone while a length is being chosen", async () => {
  const requestSubmit = vi
    .spyOn(HTMLFormElement.prototype, "requestSubmit")
    .mockImplementation(noop);
  const form = await setup();

  ensure(form.querySelector<HTMLSelectElement>("select")).click();

  expect(requestSubmit).not.toHaveBeenCalled();
});
