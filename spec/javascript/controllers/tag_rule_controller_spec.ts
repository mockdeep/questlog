import {expect, it} from "vitest";

import {bootStimulus} from "support/stimulus";
import {ensure} from "helpers/ensure";
import TagRuleController from "controllers/tag_rule_controller";
import {ruleRow} from "support/tag_rules";

async function setup(field: string): Promise<void> {
  document.body.innerHTML = `<ol>${ruleRow(field)}</ol>`;

  await bootStimulus("tag-rule", TagRuleController);
}

function enabledCheckFields(): (string | null)[] {
  const selector = "[data-check-field]:not([disabled])";

  return Array.from(document.querySelectorAll(selector)).map((check) => {
    return check.getAttribute("data-check-field");
  });
}

it("enables only the selected field's check dropdown", async () => {
  await setup("estimateSeconds");
  const selector = "[data-tag-rule-target='field']";
  const field = ensure(document.querySelector<HTMLSelectElement>(selector));

  field.value = "tagIds";
  field.dispatchEvent(new Event("change", {bubbles: true}));

  expect(enabledCheckFields()).toStrictEqual(["tagIds"]);
});

it("hides the check dropdowns of the unselected fields", async () => {
  await setup("estimateSeconds");
  const selector = "[data-tag-rule-target='field']";
  const field = ensure(document.querySelector<HTMLSelectElement>(selector));

  field.value = "tagIds";
  field.dispatchEvent(new Event("change", {bubbles: true}));

  expect(document.querySelectorAll("[data-check-field][hidden]"))
    .toHaveLength(1);
});

it("removes its row when the times icon is clicked", async () => {
  await setup("tagIds");
  const icon = ensure(document.querySelector<HTMLElement>("i.fa-times"));

  icon.click();

  expect(document.querySelectorAll("li")).toHaveLength(0);
});
