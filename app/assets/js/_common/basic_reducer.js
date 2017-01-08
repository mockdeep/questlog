export default function createBasicReducer(operations) {
  return function basicReducer(previousState, action) {
    const operation = operations[action.type];

    if (!operation) { throw new Error(`invalid action type: "${action.type}"`); }

    return operation(previousState, action.payload);
  };
}
