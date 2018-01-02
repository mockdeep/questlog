import PropTypes from 'prop-types';
import React from 'react';

import TaskRow from 'src/task/components/task_row';
import TableHeaders from 'src/task/components/table_headers';
import {taskShape} from 'src/shapes';

function taskRows(tasks, {updateTask, deleteTask}) {
  return tasks.map((task) => (
    <TaskRow
      key={task.id}
      keyPrefix={'subTasksTable'}
      task={task}
      updateTask={updateTask}
      deleteTask={deleteTask}
    />
  ));
}

function SubTasksTable({task, updateTask, deleteTask}) {
  if (task.subTasks.length === 0) { return null; }

  return (
    <div>
      <table className='task-list'>
        <thead><TableHeaders label={'Sub-tasks'} /></thead>
        <tbody>{taskRows(task.subTasks, {updateTask, deleteTask})}</tbody>
      </table>
    </div>
  );
}

SubTasksTable.propTypes = {
  deleteTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  task: taskShape,
};

export default SubTasksTable;
