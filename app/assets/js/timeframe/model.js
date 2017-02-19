'use strict';

import {Record} from 'immutable';
import {sumBy} from 'lodash';

import TimeBalancer from 'js/_helpers/time_balancer';
import timeframeNameMap from 'js/timeframe/name_map';

const Timeframe = new Record({
  currentTasks: [],
  pendingTasks: [],
  medianProductivity: null,
  name: null,
});

function baseBalance(name) {
  const balanceTime = window.balanceTime;

  return TimeBalancer.baseBalances(balanceTime)[name];
}

function calculateMaxMinutes(name, medianProductivity) {
  const baseMinutes = baseBalance(name);

  if (typeof baseMinutes === 'undefined') { return Infinity; }

  const minuteMax = Math.floor(baseMinutes * medianProductivity / 60);

  return name === 'today' ? minuteMax : Math.floor(minuteMax / 2);
}

Object.defineProperty(Timeframe.prototype, 'minuteTotal', {
  get() {
    const allTasks = this.pendingTasks.concat(this.currentTasks);

    return sumBy(allTasks, 'estimateMinutes');
  },
});

Object.defineProperty(Timeframe.prototype, 'minuteMax', {
  get() {
    if (!this._minuteMax) {
      this._minuteMax = calculateMaxMinutes(this.name, this.medianProductivity);
    }

    return this._minuteMax;
  },
});

Object.defineProperty(Timeframe.prototype, 'title', {
  get() {
    return timeframeNameMap[this.name];
  },
});

export default Timeframe;
