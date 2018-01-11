function makeTask(attrs) {
  return {
    priority: null,
    tagIds: [],
    timeframe: null,
    subTaskIds: [],
    ...attrs,
  };
}

export {makeTask};
