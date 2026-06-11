import type {ReactElement} from "react";

import TableHeaders from "./table_headers";
import TaskRow from "./task_row";
import type {UpdateTask} from "../action_creators";

interface Props {
  deleteTask: (taskId: number) => void;
  pendingTasks: Task[];
  updateTask: UpdateTask;
}

/*
 * Pending tasks are displayed in release order and are repositioned when they
 * release, so they are not draggable like current tasks are.
 */
function PendingTasksTable({
  deleteTask,
  pendingTasks,
  updateTask,
}: Props): ReactElement | null {
  if (pendingTasks.length === 0) { return null; }

  return (
    <div id='pending-tasks'>
      <table className='tasks-table'>
        <thead><TableHeaders label={"Pending tasks"} /></thead>
        <tbody>
          {pendingTasks.map((task: Task) => {
            return <TaskRow
              key={task.id}
              task={task}
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
