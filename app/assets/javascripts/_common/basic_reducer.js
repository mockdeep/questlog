export default function createBasicReducer(operations) {
  return function basicReducer(previous_state, action) {
    const operation = operations[action.type];

    if (!operation) { throw new Error(`invalid action type: "${action.type}"`); }

    return operation(previous_state, action.payload);
  };
}
