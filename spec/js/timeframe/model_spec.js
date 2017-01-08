'use strict';

import Timeframe from 'js/timeframe/model';

describe('Timeframe#minuteTotal', () => {
  it('returns the total number of minutes from tasks', () => {
    let timeframe = new Timeframe({currentTasks: [{estimateMinutes: 10}]});

    expect(timeframe.minuteTotal).toBe(10);
    timeframe = new Timeframe(
      {currentTasks: [{estimateMinutes: 10}, {estimateMinutes: 8}]}
    );
    expect(timeframe.minuteTotal).toBe(18);
    timeframe = new Timeframe({
      currentTasks: [{estimateMinutes: 10}, {estimateMinutes: 8}],
      pendingTasks: [{estimateMinutes: 5}, {estimateMinutes: 6}]
    });
    expect(timeframe.minuteTotal).toBe(29);
  });
});
