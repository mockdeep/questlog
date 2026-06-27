import {expect, it, vi} from "vitest";

import {bootStimulus, getController} from "support/stimulus";
import {ensure} from "helpers/ensure";
import TagRulesController from "controllers/tag_rules_controller";

function row(field: string, check: string): string {
  return `
    <li data-tag-rules-target="rule">
      <select name="tag[rules][][field]"><option value="${field}" selected>
      </option></select>
      <select name="tag[rules][][check]"><option value="${check}" selected>
      </option></select>
    </li>
  `;
}

async function setup(rows: string): Promise<TagRulesController> {
  document.body.innerHTML = `
    <form data-controller="tag-rules"
      data-action="submit->tag-rules#validateAndSave">
      <ol>${rows}</ol>
    </form>
  `;

  await bootStimulus("tag-rules", TagRulesController);

  const form = ensure(document.querySelector<HTMLElement>("form"));

  return getController(form, "tag-rules", TagRulesController);
}

it("blocks save when duplicates and the prompt is declined", async () => {
  vi.spyOn(window, "confirm").mockReturnValue(false);
  const controller = await setup(row("tagIds", "isEmpty").repeat(2));
  const event = new Event("submit", {cancelable: true});

  controller.validateAndSave(event);

  expect(event.defaultPrevented).toBe(true);
});

it("allows the save when the duplicate prompt is accepted", async () => {
  vi.spyOn(window, "confirm").mockReturnValue(true);
  const controller = await setup(row("tagIds", "isEmpty").repeat(2));
  const event = new Event("submit", {cancelable: true});

  controller.validateAndSave(event);

  expect(event.defaultPrevented).toBe(false);
});

it("does not prompt when there are no duplicate rules", async () => {
  const confirmSpy = vi.spyOn(window, "confirm");
  const rows = row("tagIds", "isEmpty") + row("estimateSeconds", "isBlank");
  const controller = await setup(rows);
  const event = new Event("submit", {cancelable: true});

  controller.validateAndSave(event);

  expect(confirmSpy).not.toHaveBeenCalled();
});
