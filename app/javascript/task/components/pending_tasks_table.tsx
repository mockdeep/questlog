import type {ReactElement} from "react";

import TableHeaders from "./table_headers";
import DraggableTaskRow from "./draggable_task_row";
import type {UpdateTask} from "../action_creators";

interface Props {
  deleteTask: (taskId: number) => void;
  moveTask: (id: number, afterId: number) => void;
  pendingTasks: Task[];
  saveTaskPositions: (taskId: number) => void;
  updateTask: UpdateTask;
}

function PendingTasksTable({
  deleteTask,
  moveTask,
  pendingTasks,
  saveTaskPositions,
  updateTask,
}: Props): ReactElement | null {
  if (pendingTasks.length === 0) { return null; }

  return (
    <div id='pending-tasks'>
      <table className='tasks-table'>
        <thead><TableHeaders label={"Pending tasks"} /></thead>
        <tbody>
          {pendingTasks.map((task: Task) => {
            return <DraggableTaskRow
              key={task.id}
              task={task}
              moveTask={moveTask}
              saveTaskPositions={saveTaskPositions}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default PendingTasksTable;
