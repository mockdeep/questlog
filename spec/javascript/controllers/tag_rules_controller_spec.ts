import {expect, it, vi} from "vitest";

import {bootStimulus, getController} from "support/stimulus";
import {ensure} from "helpers/ensure";
import TagRulesController from "controllers/tag_rules_controller";
import {ruleRow} from "support/tag_rules";

async function setup(rows: string): Promise<TagRulesController> {
  document.body.innerHTML = `
    <form data-controller="tag-rules"
      data-action="submit->tag-rules#validateAndSave">
      <ol data-tag-rules-target="list">${rows}</ol>
      <template data-tag-rules-target="template">
        ${ruleRow("estimateSeconds")}
      </template>
      <input type="button" value="Add Rule" data-action="click->tag-rules#add">
    </form>
  `;

  await bootStimulus("tag-rules", TagRulesController);

  const form = ensure(document.querySelector<HTMLElement>("form"));

  return getController(form, "tag-rules", TagRulesController);
}

it("blocks save when duplicates and the prompt is declined", async () => {
  vi.spyOn(window, "confirm").mockReturnValue(false);
  const controller = await setup(ruleRow("tagIds").repeat(2));
  const event = new Event("submit", {cancelable: true});

  controller.validateAndSave(event);

  expect(event.defaultPrevented).toBe(true);
});

it("allows the save when the duplicate prompt is accepted", async () => {
  vi.spyOn(window, "confirm").mockReturnValue(true);
  const controller = await setup(ruleRow("tagIds").repeat(2));
  const event = new Event("submit", {cancelable: true});

  controller.validateAndSave(event);

  expect(event.defaultPrevented).toBe(false);
});

it("does not prompt when there are no duplicate rules", async () => {
  const confirmSpy = vi.spyOn(window, "confirm");
  const rows = ruleRow("tagIds") + ruleRow("estimateSeconds");
  const controller = await setup(rows);
  const event = new Event("submit", {cancelable: true});

  controller.validateAndSave(event);

  expect(confirmSpy).not.toHaveBeenCalled();
});

it("adds a rule row from the template", async () => {
  await setup("");
  const button = ensure(document.querySelector<HTMLInputElement>("input"));

  button.click();

  expect(document.querySelectorAll("li")).toHaveLength(1);
});
