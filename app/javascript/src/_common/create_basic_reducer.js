import grab from 'src/_helpers/grab';

export default function createBasicReducer(operations) {
  return function basicReducer(previousState, action) {
    const operation = grab(operations, action.type);

    return operation(previousState, action.payload);
  };
}
