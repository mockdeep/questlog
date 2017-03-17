import {Record} from 'immutable';
import {sumBy} from 'lodash';

import timeframeNameMap from 'js/timeframe/name_map';

const Timeframe = new Record({
  currentTasks: [],
  pendingTasks: [],
  medianProductivity: null,
  minuteMax: null,
  name: null,
});

Object.defineProperty(Timeframe.prototype, 'minuteTotal', {
  get() {
    const allTasks = this.pendingTasks.concat(this.currentTasks);

    return sumBy(allTasks, 'estimateMinutes');
  },
});

Object.defineProperty(Timeframe.prototype, 'title', {
  get() {
    return timeframeNameMap[this.name];
  },
});

export default Timeframe;
