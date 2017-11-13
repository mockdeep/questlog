import PropTypes from 'prop-types';
import React from 'react';

import ToEnglish from 'src/_helpers/to_english';

function repeatString(task) {
  if (!task.repeatSeconds) { return 'Repeat: never'; }

  return `Repeat: every ${ToEnglish.seconds(task.repeatSeconds)}`;
}

function estimateString(task) {
  if (!task.estimateSeconds) { return 'Estimate: none'; }

  return `Estimate: ${ToEnglish.seconds(task.estimateSeconds)}`;
}

function priorityString(task) {
  if (!task.priority) { return 'Priority: none'; }

  return `Priority: ${task.priority}`;
}

function tagString(task) {
  if (task.tagNames.length === 0) { return 'Tags: none'; }

  return `Tags: ${task.tagNames.join(', ')}`;
}

function TaskShowScreen({task}) {
  if (!task) { return null; }

  return (
    <section>
      <h2>{task.title}</h2>
      <div>{repeatString(task)}</div>
      <div>{estimateString(task)}</div>
      <div>{priorityString(task)}</div>
      <div>{tagString(task)}</div>
    </section>
  );
}

TaskShowScreen.propTypes = {task: PropTypes.object};

export default TaskShowScreen;
