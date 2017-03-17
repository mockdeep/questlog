import {Record} from 'immutable';

const Timeframe = new Record({
  currentTasks: [],
  pendingTasks: [],
  medianProductivity: null,
  minuteMax: null,
  name: null,
});

export default Timeframe;
