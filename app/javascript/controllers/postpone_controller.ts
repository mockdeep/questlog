import {Controller} from "@hotwired/stimulus";

/*
 * The whole postpone button is clickable, so a click anywhere on it postpones
 * the task -- except on the select, where the user is only saying how long to
 * postpone it for.
 */
class PostponeController extends Controller<HTMLFormElement> {
  submit(event: Event): void {
    if (event.target instanceof HTMLSelectElement) { return; }

    this.element.requestSubmit();
  }
}

export default PostponeController;
