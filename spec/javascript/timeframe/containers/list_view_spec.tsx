import React from "react";
import {Provider} from "react-redux";
import {mount} from "enzyme";

import createAppStore from "src/create_app_store";
import TimeframeListViewContainer from "src/timeframe/containers/list_view";

it("wraps the TimeframeListView component", () => {
  const store = createAppStore();
  const container = mount(
    <Provider store={store}><TimeframeListViewContainer /></Provider>,
  );

  expect(container.find("TimeframeListView")).toHaveLength(1);
});
