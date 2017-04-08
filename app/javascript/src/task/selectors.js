import {createSelector} from 'reselect';

function getTasksFromState(state) {
  return state.tasks; // not going to work, as we need to select as array
}

function getTagsFromTasks(tasks) {
  return tasks.map((task) => task.id);
}

const getTags = createSelector([getTasksFromState], getTagsFromTasks);

export {getTags};
