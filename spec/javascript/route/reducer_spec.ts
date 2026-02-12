import {INIT, SET} from "src/route/action_creators";
import routeReducer from "src/route/reducer";

import {makeRouteState} from "_test_helpers/factories";

describe(INIT, () => {
  it("returns basic route state", () => {
    const action = {type: INIT};

    expect(routeReducer(null, action)).toEqual({params: {}});
  });
});

describe(SET, () => {
  it("returns route object corresponding to the given payload", () => {
    const previousState = makeRouteState();
    const action = {type: SET, payload: {goober: "gabber"}};

    expect(routeReducer(previousState, action)).toBe(action.payload);
  });
});
