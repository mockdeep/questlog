import {
  calculateTotalMinutes,
  timeframeNameForTask,
} from "javascript/timeframe/utils";

import {makeTask, makeTimeframe} from "support/factories";

describe("timeframeNameForTask()", () => {
  it("returns inbox when the task has no timeframe", () => {
    expect(timeframeNameForTask(makeTask({timeframe: null}))).toBe("inbox");
  });

  it("returns the timeframe of a non-pending task", () => {
    const task = makeTask({timeframe: "week"});

    expect(timeframeNameForTask(task)).toBe("week");
  });

  it("returns the timeframe a pending task releases within", () => {
    const task = makeTask({pending: true, timeframe: "today"});

    expect(timeframeNameForTask(task)).toBe("today");
  });
});

describe("calculateTotalMinutes()", () => {
  it("returns the total number of minutes from tasks", () => {
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
