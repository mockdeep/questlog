import {Controller} from "@hotwired/stimulus";

import {ensure} from "helpers/ensure";

const DRAGGING_CLASS = "tasks-table__row--dragging";
const ROW_SELECTOR = "[data-task-drag-target='row']";

interface Neighbours {
  above: HTMLElement | undefined;
  below: HTMLElement | undefined;
}

function position(row: HTMLElement): number {
  return Number(row.dataset.position);
}

function priority(row: HTMLElement): number | null {
  const value = row.dataset.priority;

  if (value === undefined) { return null; }

  return Number(value);
}

function taskId(row: HTMLElement): string {
  return ensure(row.dataset.taskId);
}

/*
 * Only elements are worth looking up a row from: a drag passing over a text
 * node is left to the next dragover, which lands on the element itself.
 */
function rowFor(event: DragEvent): HTMLElement | undefined {
  const {target} = event;

  if (!(target instanceof Element)) { return undefined; }

  return target.closest<HTMLElement>(ROW_SELECTOR) ?? undefined;
}

function priorityValue(value: number | null): string {
  if (value === null) { return ""; }

  return String(value);
}

function isMoreUrgent(other: number | null, own: number | null): boolean {
  if (own === null) { return true; }

  return other !== null && other < own;
}

function isLessUrgent(other: number | null, own: number | null): boolean {
  if (other === null) { return true; }

  return own !== null && other > own;
}

/*
 * A task dropped between two others takes the priority of the one below it,
 * unless it already shares a priority with one of its new neighbours, or the
 * neighbour it landed against is no more urgent than it already was.
 */
function newPriority(
  row: HTMLElement,
  {above, below}: Neighbours,
): number | null {
  const own = priority(row);

  if (above && below) {
    if ([priority(above), priority(below)].includes(own)) { return own; }

    return priority(below);
  }
  if (below && isMoreUrgent(priority(below), own)) { return priority(below); }
  if (above && isLessUrgent(priority(above), own)) { return priority(above); }

  return own;
}

/*
 * The task takes the position of whichever neighbour it displaced, and the
 * server shifts the rest of the sequence to make room. The rows still carry
 * the positions they had before the drag, so comparing against them says
 * which way the task travelled.
 */
function newPosition(row: HTMLElement, {above, below}: Neighbours): number {
  if (below && position(row) > position(below)) { return position(below); }
  if (above && position(row) < position(above)) { return position(above); }

  return position(row);
}

/*
 * Reorders task rows as they are dragged over one another, then saves where
 * the dropped task ended up.
 */
class TaskDragController extends Controller {
  static override targets = ["row", "form", "position", "priority"];

  declare readonly rowTargets: HTMLElement[];

  declare readonly formTarget: HTMLFormElement;

  declare readonly positionTarget: HTMLInputElement;

  declare readonly priorityTarget: HTMLInputElement;

  dragged: HTMLElement | undefined;

  start(event: DragEvent): void {
    const row = rowFor(event);

    if (!row) { return; }

    this.dragged = row;
    row.classList.add(DRAGGING_CLASS);
    // A drag carrying nothing on its data transfer is cancelled by the browser.
    ensure(event.dataTransfer).setData("text/plain", taskId(row));
  }

  move(event: DragEvent): void {
    const {dragged} = this;
    const row = rowFor(event);

    if (!dragged || !row || row === dragged) { return; }

    // Dropping is only allowed on a target that cancels the dragover.
    event.preventDefault();

    const rows = this.rowTargets;

    if (rows.indexOf(dragged) < rows.indexOf(row)) {
      row.after(dragged);
    } else {
      row.before(dragged);
    }
  }

  drop(): void {
    const {dragged} = this;

    if (!dragged) { return; }

    this.dragged = undefined;
    dragged.classList.remove(DRAGGING_CLASS);
    this.save(dragged);
  }

  private save(row: HTMLElement): void {
    const neighbours = this.neighbours(row);

    this.formTarget.action = `/tasks/${taskId(row)}`;
    this.positionTarget.value = String(newPosition(row, neighbours));
    this.priorityTarget.value = priorityValue(newPriority(row, neighbours));
    this.formTarget.requestSubmit();
  }

  private neighbours(row: HTMLElement): Neighbours {
    const rows = this.rowTargets;
    const index = rows.indexOf(row);

    return {above: rows[index - 1], below: rows[index + 1]};
  }
}

export default TaskDragController;
