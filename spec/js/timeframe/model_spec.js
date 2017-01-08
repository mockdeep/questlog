'use strict';

import Timeframe from 'js/timeframe/model';

describe('Timeframe#minuteTotal', () => {
  it('returns the total number of minutes from tasks', () => {
    let timeframe = new Timeframe({currentTasks: [{estimate_minutes: 10}]});

    expect(timeframe.minuteTotal).toBe(10);
    timeframe = new Timeframe(
      {currentTasks: [{estimate_minutes: 10}, {estimate_minutes: 8}]}
    );
    expect(timeframe.minuteTotal).toBe(18);
    timeframe = new Timeframe({
      currentTasks: [{estimate_minutes: 10}, {estimate_minutes: 8}],
      pendingTasks: [{estimate_minutes: 5}, {estimate_minutes: 6}]
    });
    expect(timeframe.minuteTotal).toBe(29);
  });
});
