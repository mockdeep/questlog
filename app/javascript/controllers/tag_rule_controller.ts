import {Controller} from "@hotwired/stimulus";

/*
 * A rule row renders one check dropdown per field and disables all but the
 * selected field's, so only the active dropdown is submitted.
 */
class TagRuleController extends Controller<HTMLElement> {
  static override targets = ["check", "field"];

  declare readonly checkTargets: HTMLSelectElement[];

  declare readonly fieldTarget: HTMLSelectElement;

  fieldChanged(): void {
    const {value} = this.fieldTarget;

    this.checkTargets.forEach((check) => {
      const inactive = check.getAttribute("data-check-field") !== value;

      check.toggleAttribute("disabled", inactive);
      check.toggleAttribute("hidden", inactive);
    });
  }

  remove(): void {
    this.element.remove();
  }
}

export default TagRuleController;
