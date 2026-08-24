import {SET, setRoute} from "javascript/route/action_creators";

it("returns a SET action for the given route", () => {
  const route = {name: "tag", params: {slug: "my-house"}};

  expect(setRoute(route)).toEqual({type: SET, payload: route});
});

it("defaults the params when the server sends none", () => {
  const payload = {name: "tasks", params: {}};

  expect(setRoute({name: "tasks"})).toEqual({type: SET, payload});
});

it("throws when the route has no name", () => {
  expect(() => { setRoute({}); }).toThrow(/missing its route name/u);
});

it("throws when the route name is blank", () => {
  expect(() => { setRoute({name: ""}); }).toThrow(/missing its route name/u);
});
