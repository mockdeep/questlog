import {Controller} from "@hotwired/stimulus";

const IDLE_CLASS = "hidden-border";

/*
 * The editable task title in a table row: it grows to fit what has been typed,
 * shows its border once it has been focused, and saves on enter or on leaving
 * the field with a changed title.
 */
class TaskTitleController extends Controller<HTMLTextAreaElement> {
  override connect(): void {
    this.resize();
  }

  /*
   * ScrollHeight covers the content and padding but not the border, which a
   * border-box element still has to make room for.
   */
  resize(): void {
    this.element.style.height = "auto";
    this.element.style.height =
      `${this.element.scrollHeight + this.borderHeight()}px`;
  }

  borderHeight(): number {
    const styles = getComputedStyle(this.element);

    if (styles.boxSizing !== "border-box") { return 0; }

    return Number.parseFloat(styles.borderTopWidth) +
      Number.parseFloat(styles.borderBottomWidth);
  }

  reveal(): void {
    this.element.classList.remove(IDLE_CLASS);
  }

  save(): void {
    this.element.form?.requestSubmit();
  }

  saveOnEnter(event: KeyboardEvent): void {
    if (event.key !== "Enter") { return; }

    event.preventDefault();
    this.save();
  }
}

export default TaskTitleController;
