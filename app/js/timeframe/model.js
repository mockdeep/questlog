import {Record} from 'immutable';
import {sumBy} from 'lodash';

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

export default Timeframe;
