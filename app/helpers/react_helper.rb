# frozen_string_literal: true

module ReactHelper
  def react_mount_data(component_name, route_name, **params)
    route = { name: route_name, params: }

    {
      controller: "react",
      react_component_name_value: component_name,
      react_route_value: route.to_json,
    }
  end
end
