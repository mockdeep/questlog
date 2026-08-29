# frozen_string_literal: true

module Views
  module Tasks
    class Row < Views::Base
      register_value_helper :edit_icon
      register_value_helper :task_field_form_options
      register_value_helper :task_row_options
      register_value_helper :timeframe_options
      register_output_helper :task_action_button
      register_output_helper :task_link_to
      register_output_helper :task_row_buttons

      PRIORITIES = [["-", ""], ["1", 1], ["2", 2], ["3", 3]].freeze

      def initialize(task:, status:, spaces:, draggable:)
        @task = task
        @status = status
        @spaces = spaces
        @draggable = draggable
        super()
      end

      def view_template
        tr(**row_options) do
          td(class: "tasks-table__cell") { done_button }
          td { render(TitleForm.new(task: @task)) }
          td { task_link_to(edit_icon, @task) }
          td { "#{@task.estimate_minutes} min" }
          td { repeat_emblem }
          td { priority_form }
          td { timeframe_form }
          td { task_row_buttons(@task) }
        end
      end

      private

      def row_options
        task_row_options(@task, status: @status, draggable: @draggable)
      end

      def done_button
        task_action_button("DONE", @task, done: true)
      end

      def repeat_emblem
        return unless @task.repeat_seconds

        i(class: "fas fa-redo-alt", title: "task repeats")
      end

      def priority_form
        form_with(**task_field_form_options(@task)) do
          select_tag("task[priority]", id: nil) do
            options_for_select(PRIORITIES, @task.priority)
          end
        end
      end

      def timeframe_form
        return unless @spaces

        form_with(**task_field_form_options(@task)) do
          select_tag(
            "task[timeframe]",
            timeframe_options(@task, @spaces),
            id: nil,
            class: "timeframe-select",
          )
        end
      end
    end
  end
end
