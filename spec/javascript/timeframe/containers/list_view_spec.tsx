function noop(): void {
  // Never resolves
}

vi.mock("src/timeframe/store", () => {
  return {
    "default": {
      getAll: vi.fn().mockReturnValue(new Promise(noop)),
      subscribe: vi.fn(),
    },
  };
});

import {Provider} from "react-redux";
import {render, screen} from "@testing-library/react";

import createAppStore from "src/_common/create_app_store";
import TimeframeListViewContainer from "src/timeframe/containers/list_view";

it("wraps the TimeframeListView component", () => {
  const store = createAppStore();
  render(
    <Provider store={store}><TimeframeListViewContainer /></Provider>,
  );

  expect(screen.getByText("Loading Timeframes...")).toBeInTheDocument();
});
