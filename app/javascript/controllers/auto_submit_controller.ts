import {Controller} from "@hotwired/stimulus";

/*
 * Submits its form as soon as one of the form's inputs changes, so a control
 * like a checkbox can stand in for a submit button.
 */
class AutoSubmitController extends Controller<HTMLFormElement> {
  submit(): void {
    this.element.requestSubmit();
  }
}

export default AutoSubmitController;
