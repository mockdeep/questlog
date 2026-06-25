import {render, screen} from "@testing-library/react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {fireDragDrop} from "react-dnd-test-utils";
import {expect, it, vi} from "vitest";

import {ensure} from "helpers/ensure";
import type {UpdateTask} from "javascript/task/action_creators";
import DraggableTaskRow from "javascript/task/components/draggable_task_row";

import {makeTask} from "support/factories";

const moveTask = vi.fn<(id: number, afterId: number) => void>();
const saveTaskPositions = vi.fn<(taskId: number) => void>();
const base = {
  deleteTask: vi.fn<(taskId: number) => void>(),
  moveTask,
  saveTaskPositions,
  updateTask: vi.fn<UpdateTask>(),
};

it("moves and saves task positions on drag and drop", async () => {
  const dragged = makeTask({id: 1});
  const target = makeTask({id: 2});
  render(<DndProvider backend={HTML5Backend}>
    <table><tbody>
      <DraggableTaskRow {...base} task={dragged} />
      <DraggableTaskRow {...base} task={target} />
    </tbody></table>
  </DndProvider>);
  const rows = screen.getAllByRole("row");

  await fireDragDrop(ensure(rows[0]), ensure(rows[1]));

  expect(moveTask).toHaveBeenCalledWith(1, 2);
  expect(saveTaskPositions).toHaveBeenCalledWith(1);
});
