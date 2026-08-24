import {Controller} from "@hotwired/stimulus";

const DUPLICATE_PROMPT = "There are duplicate rules. Remove extras?";

/*
 * Read what the row will actually submit: each row renders a check dropdown
 * per field and disables all but the selected field's.
 */
function selectValue(row: Element, field: string): string | undefined {
  const selector = `[name="tag[rules][][${field}]"]:not([disabled])`;

  return row.querySelector<HTMLSelectElement>(selector)?.value;
}

function ruleKey(row: Element): string {
  return `${selectValue(row, "field")}-${selectValue(row, "check")}`;
}

class TagRulesController extends Controller<HTMLElement> {
  static override targets = ["list", "rule", "template"];

  declare readonly listTarget: HTMLElement;

  declare readonly ruleTargets: HTMLElement[];

  declare readonly templateTarget: HTMLTemplateElement;

  add(): void {
    this.listTarget.append(this.templateTarget.content.cloneNode(true));
  }

  validateAndSave(event: Event): void {
    if (!this.hasDuplicateRules()) { return; }

    // eslint-disable-next-line no-alert
    if (!confirm(DUPLICATE_PROMPT)) {
      event.preventDefault();
    }
  }

  private hasDuplicateRules(): boolean {
    const keys = this.ruleTargets.map(ruleKey);

    return new Set(keys).size !== keys.length;
  }
}

export default TagRulesController;
