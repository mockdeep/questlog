# frozen_string_literal: true

module ReactHelper
  include Serializable::Helpers

  def react_mount_data(component_name, route_name, **params)
    route = { name: route_name, params: }

    {
      controller: "react",
      react_component_name_value: component_name,
      react_route_value: route.to_json,
      react_tasks_value: serialized_tasks.to_json,
      react_tags_value: serialized_tags.to_json,
    }
  end

  private

  def serialized_tasks
    serialize(current_user.undone_and_pending_tasks)[:data]
  end

  def serialized_tags
    serialize(TagList.for(user: current_user))[:data]
  end
end
