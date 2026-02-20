import {memo, useCallback} from "react";
import type {ReactElement} from "react";
import {useDrag, useDrop} from "react-dnd";

import TaskRow from "./task_row";
import type {UpdateTask} from "../action_creators";

type Props = {
  deleteTask: (taskId: number) => void,
  moveTask: (id: number, afterId: number) => void;
  saveTaskPositions: (taskId: number) => void,
  task: Task,
  updateTask: UpdateTask,
};

type DragItem = {id: number};

function DraggableTaskRow({
  deleteTask,
  moveTask,
  saveTaskPositions,
  task,
  updateTask,
}: Props): ReactElement {
  const [{isDragging}, drag] = useDrag({
    collect: (monitor) => {
      return {isDragging: monitor.isDragging()};
    },
    end: () => { saveTaskPositions(task.id); },
    item: (): DragItem => {
      return {id: task.id};
    },
    type: "task",
  });

  const [, drop] = useDrop({
    accept: "task",
    hover: (item: DragItem) => { moveTask(item.id, task.id); },
  });

  const bindRef = useCallback((component: TaskRow | null) => {
    if (!component) { return; }
    const {domNode} = component;
    if (domNode) {
      drag(domNode);
      drop(domNode);
    }
  }, [drag, drop]);

  return (
    <TaskRow
      deleteTask={deleteTask}
      isDragging={isDragging}
      task={task}
      updateTask={updateTask}
      ref={bindRef}
    />
  );
}

export default memo(DraggableTaskRow);
