import {matchPath} from "javascript/route/helpers";

describe("matchPath", () => {
  it("returns a match for a root route", () => {
    const match = matchPath("/");

    expect(match).toEqual({name: "root", params: {}});
  });

  it("returns a match for a basic route", () => {
    const match = matchPath("/tasks");

    expect(match).toEqual({name: "tasks", params: {}});
  });

  it("returns a match with a route param", () => {
    const match = matchPath("/tags/foo");

    expect(match).toEqual({name: "tag", params: {slug: "foo"}});
  });

  it("returns a match with a nested route", () => {
    const match = matchPath("/leaf_tasks");

    expect(match).toEqual({name: "leafTasks", params: {}});
  });

  it("raises an error when a match cannot be found", () => {
    expect(() => { matchPath("/not/a/route"); }).toThrow(/No route found/u);
  });
});
