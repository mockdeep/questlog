import type {Moment} from 'moment';
import moment from 'moment';
import {sumBy} from 'lodash';

import grab from 'src/_helpers/grab';
import TimeBalancer from 'src/_helpers/time_balancer';
import {assert} from 'src/_helpers/assert';

const timeframeEnds: {[timeframeName in TimeframeName]: Moment | null} = {
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
  return TimeBalancer.baseBalances()[name];
}

function calculateMaxMinutes(
  name: TimeframeName,
  medianProductivity: number,
): number {
  const baseMinutes = baseBalance(name);

  if (typeof baseMinutes === 'undefined') { return Infinity; }

  const minuteMax = Math.floor(baseMinutes * medianProductivity / 60);

  return name === 'today' ? minuteMax : Math.floor(minuteMax / 2);
}

function calculateTotalMinutes(timeframe: Timeframe): number {
  const allTasks = timeframe.pendingTasks.concat(timeframe.currentTasks);

  return sumBy(allTasks, 'estimateMinutes');
}

function timeframeNameForPendingTask(task: Task) {
  const releaseAt = moment(assert(task.releaseAt));
  let index = timeframeList.indexOf(assert(task.timeframe)) - 1;
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

function timeframeNameForTask(task: Task): TimeframeName {
  if (!task.timeframe) { return 'inbox'; }

  return task.pending ? timeframeNameForPendingTask(task) : task.timeframe;
}

export {
  calculateMaxMinutes,
  calculateTotalMinutes,
  timeframeList,
  timeframeNameForTask,
};
