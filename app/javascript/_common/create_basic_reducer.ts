import {grab} from "helpers/grab";

type Payload = BasicAction["payload"];

type Operations<S> = {
  [key: string]: (previousState: S | null, payload: Payload) => void;
};

function createBasicReducer<
  S extends State[keyof State],
  O extends Operations<S>,
>(operations: O) {
  function basicReducer(previousState: S | null, action: BasicAction) {
    const operation = grab(operations, action.type);

    return operation(previousState, action.payload);
  }

  return basicReducer;
}

export default createBasicReducer;
