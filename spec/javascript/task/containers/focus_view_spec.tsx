vi.mock("helpers/request", () => {
  const fakePromise: {then: Mock} = {
    then: vi.fn(() => {
      return fakePromise;
    }),
  };

  return {
    request: (): typeof fakePromise => {
      return fakePromise;
    },
  };
});

import type {Mock} from "vitest";

import React from "react";
import {Provider} from "react-redux";
import {render, screen} from "@testing-library/react";

import TaskFocusViewContainer from "src/task/containers/focus_view";
import createAppStore from "src/create_app_store";

it("wraps the Item component", () => {
  render(
    <Provider store={createAppStore()}><TaskFocusViewContainer /></Provider>,
  );

  // Default store has ajaxState "loading", so the view shows Loading...
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});
