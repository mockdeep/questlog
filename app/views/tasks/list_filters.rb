# frozen_string_literal: true

module Views
  module Tasks
    class ListFilters < Views::Base
      register_output_helper :active_link_to

      def view_template
        div(class: "task-filters") do
          plain("Filter:")
          filter_link("ALL", tasks_path)
          filter_link("ROOT", root_tasks_path)
          filter_link("LEAF", leaf_tasks_path)
          filter_link("TREE", tree_tasks_path)
          whitespace
          alpha_tag
        end
      end

      private

      def filter_link(label, path)
        whitespace
        active_link_to(label, path, class: "task-filter")
      end

      def alpha_tag
        span(class: "alpha-tag") do
          link_to(alpha_index_path, data: alpha_data) { sup { "(alpha)" } }
        end
      end

      def alpha_data
        { turbo: true, turbo_frame: "dialog" }
      end
    end
  end
end
