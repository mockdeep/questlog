import React from 'react';

import TaskRow from 'src/task/components/task_row';
import TableHeaders from 'src/task/components/table_headers';
import type {UpdateTask} from 'src/task/action_creators';

type FunctionProps = {
  deleteTask: (taskId: number) => void,
  updateTask: UpdateTask,
};

export type Props = FunctionProps & { subTasks: Task[]; };

function taskRows(tasks: Task[], {updateTask, deleteTask}: FunctionProps) {
  return tasks.map(task => (
    <TaskRow
      key={task.id}
      task={task}
      updateTask={updateTask}
      deleteTask={deleteTask}
    />
  ));
}

function SubTasksTable({subTasks, updateTask, deleteTask}: Props) {
  if (subTasks.length === 0) { return null; }

  return (
    <div>
      <table className='tasks-table'>
        <thead><TableHeaders label={'Sub-tasks'} /></thead>
        <tbody>{taskRows(subTasks, {updateTask, deleteTask})}</tbody>
      </table>
    </div>
  );
}

export default SubTasksTable;
