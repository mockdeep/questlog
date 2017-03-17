import moment from 'moment';
import {sumBy} from 'lodash';

import TimeBalancer from 'js/_helpers/time_balancer';

const timeframeEnds = {
  today: moment().endOf('day'),
  week: moment().endOf('week'),
  month: moment().endOf('month'),
  quarter: moment().endOf('quarter'),
  year: moment().endOf('year'),
};

const timeframeList = [
  'inbox',
  'today',
  'week',
  'month',
  'quarter',
  'year',
  'lustrum',
  'decade',
];

function baseBalance(name) {
  const {balanceTime} = window;

  return TimeBalancer.baseBalances(balanceTime)[name];
}

function calculateMaxMinutes(name, medianProductivity) {
  const baseMinutes = baseBalance(name);

  if (typeof baseMinutes === 'undefined') { return Infinity; }

  const minuteMax = Math.floor(baseMinutes * medianProductivity / 60);

  return name === 'today' ? minuteMax : Math.floor(minuteMax / 2);
}

function calculateTotalMinutes(timeframe) {
  const allTasks = timeframe.pendingTasks.concat(timeframe.currentTasks);

  return sumBy(allTasks, 'estimateMinutes');
}

function timeframeNameForPendingTask(task) {
  const releaseAt = moment(task.release_at);
  let index = timeframeList.indexOf(task.timeframe) - 1;
  let timeframeName;
  let timeframeEnd;

  do {
    index += 1;
    timeframeName = timeframeList[index];
    timeframeEnd = timeframeEnds[timeframeName];
    if (!timeframeEnd) { return timeframeName; }
  } while (releaseAt.diff(timeframeEnd) > 0);

  return timeframeList[index];
}

function timeframeNameForTask(task) {
  if (!task.timeframe) { return 'inbox'; }

  return task.pending ? timeframeNameForPendingTask(task) : task.timeframe;
}

export {
  calculateMaxMinutes,
  calculateTotalMinutes,
  timeframeList,
  timeframeNameForTask,
};
