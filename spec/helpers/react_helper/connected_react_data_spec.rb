# frozen_string_literal: true

RSpec.describe ReactHelper, "#connected_react_data" do
  it "returns the stimulus mount data for a component" do
    expected = {
      controller: "connected-react",
      connected_react_component_name_value: "tasks",
    }

    expect(helper.connected_react_data("tasks")).to eq(expected)
  end
end
