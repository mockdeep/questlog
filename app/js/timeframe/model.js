import {Record} from 'immutable';
import {sumBy} from 'lodash';

import timeframeNameMap from 'js/timeframe/name_map';
import {calculateMaxMinutes} from 'js/timeframe/utils';

const Timeframe = new Record({
  currentTasks: [],
  pendingTasks: [],
  medianProductivity: null,
  name: null,
});

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
