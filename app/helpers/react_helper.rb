# frozen_string_literal: true

module ReactHelper
  def connected_react_data(component_name)
    {
      controller: "connected-react",
      connected_react_component_name_value: component_name,
    }
  end
end
