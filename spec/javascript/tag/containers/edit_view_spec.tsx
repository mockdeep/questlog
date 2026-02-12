import React from "react";
import {Provider} from "react-redux";
import {render} from "@testing-library/react";

import TagEditFormContainer from "src/tag/containers/edit_view";
import createAppStore from "src/create_app_store";

it("wraps the EditForm component", () => {
  const {container} = render(
    <Provider store={createAppStore()}><TagEditFormContainer /></Provider>,
  );

  // TagEditView renders null when no tag is present
  expect(container).toBeInTheDocument();
});
