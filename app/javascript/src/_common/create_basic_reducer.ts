import grab from 'src/_helpers/grab';

type ReducerMap = {[key: string]: Function};

export default function createBasicReducer(operations: ReducerMap) {
  return function basicReducer(previousState: SubState, action: BasicAction) {
    const operation = grab(operations, action.type);

    return operation(previousState, action.payload);
  };
}
