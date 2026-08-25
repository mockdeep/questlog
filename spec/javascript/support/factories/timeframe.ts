function makeTimeframe(attrs: Partial<Timeframe> = {}): Timeframe {
  return {
    name: "inbox",
    minuteMax: Infinity,
    minuteTotal: 0,
    currentTasks: [],
    pendingTasks: [],
    ...attrs,
  };
}

export {makeTimeframe};
