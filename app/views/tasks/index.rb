# frozen_string_literal: true

module Views
  module Tasks
    class Index < Views::Base
      register_value_helper :task_drag_options

      def initialize(tasks:)
        @tasks = tasks
        super()
      end

      def view_template
        render(New.new)
        br
        render(ListFilters.new)
        turbo_frame_tag("task-list", data: task_drag_options) do
          render(Table.new(**current_options))
          render(Table.new(**pending_options))
          drag_form
        end
      end

      private

      def current_options
        {
          tasks: @tasks.current,
          table_id: "current-tasks",
          heading: "Current tasks",
          status: nil,
          draggable: true,
        }
      end

      def pending_options
        {
          tasks: @tasks.pending,
          table_id: "pending-tasks",
          heading: "Pending tasks",
          status: "pending",
          draggable: false,
        }
      end

      # filled in and submitted by the drag controller once a task is dropped
      def drag_form
        form_with(**drag_form_options) do
          drag_field("task[position]", "position")
          drag_field("task[priority]", "priority")
        end
      end

      def drag_form_options
        {
          url: tasks_path,
          method: :patch,
          class: "contents-form",
          data: { turbo: true, task_drag_target: "form" },
        }
      end

      def drag_field(name, target)
        data = { task_drag_target: target }

        hidden_field_tag(name, nil, id: nil, data:)
      end
    end
  end
end
