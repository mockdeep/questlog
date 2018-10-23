import {calculateTotalMinutes} from 'src/timeframe/utils';

import {makeTask, makeTimeframe} from '_test_helpers/factories';

describe('calculateTotalMinutes()', () => {
  it('returns the total number of minutes from tasks', () => {
    let timeframe: Timeframe = makeTimeframe({
      currentTasks: [makeTask({estimateMinutes: 10})],
    });

    expect(calculateTotalMinutes(timeframe)).toBe(10);
    timeframe = makeTimeframe({
      currentTasks: [
        makeTask({estimateMinutes: 10}),
        makeTask({estimateMinutes: 8}),
      ],
    });
    expect(calculateTotalMinutes(timeframe)).toBe(18);
    timeframe = makeTimeframe({
      currentTasks: [
        makeTask({estimateMinutes: 10}),
        makeTask({estimateMinutes: 8}),
      ],
      pendingTasks: [
        makeTask({estimateMinutes: 5}),
        makeTask({estimateMinutes: 6}),
      ],
    });
    expect(calculateTotalMinutes(timeframe)).toBe(29);
  });
});
