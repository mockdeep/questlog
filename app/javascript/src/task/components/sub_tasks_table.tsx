import PropTypes from 'prop-types';
import React from 'react';

import TaskRow from 'src/task/components/task_row';
import TableHeaders from 'src/task/components/table_headers';
import {taskShape} from 'src/shapes';

type FunctionProps = {
  deleteTask: Function,
  updateTask: Function,
};

export type Props = FunctionProps & { subTasks: Task[]; };

function taskRows(tasks: Task[], {updateTask, deleteTask}: FunctionProps) {
  return tasks.map(task => (
    <TaskRow
      key={task.id}
      keyPrefix={'subTasksTable'}
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

SubTasksTable.propTypes = {
  deleteTask: PropTypes.func.isRequired,
  subTasks: PropTypes.arrayOf(taskShape).isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default SubTasksTable;
