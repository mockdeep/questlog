import reducer from "src/_common/app_reducer";

import {makeState} from "_test_helpers/factories";

describe("appReducer", () => {
  describe("init", () => {
    it("returns a blank nested tree of state", () => {
      const action = {type: "@@redux/INIT"};
      const expectedState = {
        route: {params: {}},
        tag: {byId: {}, meta: {}},
        task: {
          byId: {},
          meta: {postponeSeconds: 300, ajaxState: "loading"},
        },
      };

      expect(reducer(null, action)).toEqual(expectedState);
    });
  });

  describe("invalid action type", () => {
    it("throws an error", () => {
      const action = {type: "booger/UPDATE", payload: {booger: "flick"}};
      const message = /invalid reducer key "booger"/u;

      expect(() => {
        reducer(makeState({}), action);
      }).toThrow(message);
    });
  });
});
