import {calculateTotalMinutes} from 'js/timeframe/utils';

describe('calculateTotalMinutes()', () => {
  it('returns the total number of minutes from tasks', () => {
    let timeframe = {currentTasks: [{estimateMinutes: 10}], pendingTasks: []};

    expect(calculateTotalMinutes(timeframe)).toBe(10);
    timeframe = {
      currentTasks: [{estimateMinutes: 10}, {estimateMinutes: 8}],
      pendingTasks: [],
    };
    expect(calculateTotalMinutes(timeframe)).toBe(18);
    timeframe = {
      currentTasks: [{estimateMinutes: 10}, {estimateMinutes: 8}],
      pendingTasks: [{estimateMinutes: 5}, {estimateMinutes: 6}],
    };
    expect(calculateTotalMinutes(timeframe)).toBe(29);
  });
});
