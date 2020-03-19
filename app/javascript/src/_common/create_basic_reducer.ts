import grab from 'src/_helpers/grab';

type ReducerMap = {[key: string]: Function};

export default function createBasicReducer<S, O>(operations: O) {
  function basicReducer(previousState: S | null, action: BasicAction) {
    const operation = grab(operations, action.type);

    return operation(previousState, action.payload);
  }

  return basicReducer;
}
