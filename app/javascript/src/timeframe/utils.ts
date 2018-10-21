/* eslint-disable import/named, no-unused-vars */
import moment, {Moment} from 'moment';
/* eslint-enable import/named, no-unused-vars */
import {sumBy} from 'lodash';

import grab from 'src/_helpers/grab';
import TimeBalancer from 'src/_helpers/time_balancer';

const timeframeEnds: {[timeframeName in TimeframeName]: Moment} = {
  inbox: null,
  today: moment().endOf('day'),
  week: moment().endOf('week'),
  month: moment().endOf('month'),
  quarter: moment().endOf('quarter'),
  year: moment().endOf('year'),
  lustrum: null,
  decade: null,
};

const timeframeList: TimeframeName[] = [
  'inbox',
  'today',
  'week',
  'month',
  'quarter',
  'year',
  'lustrum',
  'decade',
];

function baseBalance(name: TimeframeName) {
  const {balanceTime} = window;

  return TimeBalancer.baseBalances(balanceTime)[name];
}

function calculateMaxMinutes(name: TimeframeName, medianProductivity: number) {
  const baseMinutes = baseBalance(name);

  if (typeof baseMinutes === 'undefined') { return Infinity; }

  const minuteMax = Math.floor(baseMinutes * medianProductivity / 60);

  return name === 'today' ? minuteMax : Math.floor(minuteMax / 2);
}

function calculateTotalMinutes(timeframe: Timeframe) {
  const allTasks = timeframe.pendingTasks.concat(timeframe.currentTasks);

  return sumBy(allTasks, 'estimateMinutes');
}

function timeframeNameForPendingTask(task: Task) {
  const releaseAt = moment(task.releaseAt);
  let index = timeframeList.indexOf(task.timeframe) - 1;
  let timeframeName;
  let timeframeEnd;

  do {
    index += 1;
    timeframeName = timeframeList[index];
    timeframeEnd = grab(timeframeEnds, timeframeName);
    if (!timeframeEnd) { return timeframeName; }
  } while (releaseAt.diff(timeframeEnd) > 0);

  return timeframeList[index];
}

function timeframeNameForTask(task: Task) {
  if (!task.timeframe) { return 'inbox'; }

  return task.pending ? timeframeNameForPendingTask(task) : task.timeframe;
}

export {
  calculateMaxMinutes,
  calculateTotalMinutes,
  timeframeList,
  timeframeNameForTask,
};
