import Timeframe from 'js/timeframe/model';
import {calculateTotalMinutes} from 'js/timeframe/utils';

describe('calculateTotalMinutes()', () => {
  it('returns the total number of minutes from tasks', () => {
    let timeframe = new Timeframe({currentTasks: [{estimateMinutes: 10}]});

    expect(calculateTotalMinutes(timeframe)).toBe(10);
    timeframe = new Timeframe(
      {currentTasks: [{estimateMinutes: 10}, {estimateMinutes: 8}]}
    );
    expect(calculateTotalMinutes(timeframe)).toBe(18);
    timeframe = new Timeframe({
      currentTasks: [{estimateMinutes: 10}, {estimateMinutes: 8}],
      pendingTasks: [{estimateMinutes: 5}, {estimateMinutes: 6}],
    });
    expect(calculateTotalMinutes(timeframe)).toBe(29);
  });
});
