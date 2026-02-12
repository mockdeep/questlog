function makeTimeframe(attrs: Partial<Timeframe> = {}): Timeframe {
  return {
    name: "inbox",
    medianProductivity: 30,
    minuteMax: Infinity,
    currentTasks: [],
    pendingTasks: [],
    ...attrs,
  };
}

export {makeTimeframe};
