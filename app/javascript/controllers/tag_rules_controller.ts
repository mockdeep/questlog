import {Controller} from "@hotwired/stimulus";

const DUPLICATE_PROMPT = "There are duplicate rules. Remove extras?";

function selectValue(row: Element, field: string): string | undefined {
  const selector = `[name="tag[rules][][${field}]"]`;

  return row.querySelector<HTMLSelectElement>(selector)?.value;
}

function ruleKey(row: Element): string {
  return `${selectValue(row, "field")}-${selectValue(row, "check")}`;
}

class TagRulesController extends Controller<HTMLElement> {
  static override targets = ["rule"];

  declare readonly ruleTargets: HTMLElement[];

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
