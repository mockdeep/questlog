import {sumBy} from 'lodash';

import TimeBalancer from 'js/_helpers/time_balancer';

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

export {calculateMaxMinutes, calculateTotalMinutes};
