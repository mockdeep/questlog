# frozen_string_literal: true

module Views
  module Layouts
    class Sidebar < Views::Base
      register_output_helper :active_link_to

      def view_template
        expanded
        collapsed
      end

      private

      def expanded
        div(**expanded_options) do
          h2(class: "sidebar__header") do
            plain("Menu")
            whitespace
            toggle("visible", "layout#hideSidebar")
          end
          hr(class: "sidebar__divider")
          links
        end
      end

      def expanded_options
        {
          class: "sidebar sidebar--visible",
          data: { layout_target: "expandedSidebar" },
        }
      end

      def links
        h2 { active_link_to("FOCUS", root_path, class: "sidebar__link") }
        h2 { active_link_to("ALL TASKS", tasks_path, class: "sidebar__link") }
        h2 { timeframes_link }
      end

      def timeframes_link
        active_link_to("TIMEFRAMES", timeframes_path, class: "sidebar__link")
      end

      def collapsed
        div(**collapsed_options) { toggle("hidden", "layout#showSidebar") }
      end

      def collapsed_options
        {
          class: "sidebar sidebar--hidden hide-me",
          data: { layout_target: "collapsedSidebar" },
        }
      end

      def toggle(state, action)
        classes = ["sidebar__toggle", "sidebar__toggle--#{state}"]

        button(class: classes, data: { action: }) { i(class: "fas fa-bars") }
      end
    end
  end
end
