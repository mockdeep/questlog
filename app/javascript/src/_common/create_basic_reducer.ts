import grab from 'src/_helpers/grab';

type Operations = {
  [key: string]: Function;
};

function createBasicReducer<S, O extends Operations>(operations: O) {
  function basicReducer(previousState: S | null, action: BasicAction) {
    const operation = grab(operations, action.type);

    return operation(previousState, action.payload);
  }

  return basicReducer;
}

export default createBasicReducer;
