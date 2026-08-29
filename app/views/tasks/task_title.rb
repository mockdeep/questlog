# frozen_string_literal: true

module Views
  module Tasks
    class TaskTitle < Views::Base
      register_value_helper :edit_icon
      register_value_helper :focus_task_classes
      register_value_helper :timeframe_label
      register_output_helper :focus_delete_button
      register_output_helper :task_link_to
      register_output_helper :task_repeat_emblem

      def initialize(task:)
        @task = task
        super()
      end

      def view_template
        div(class: "row") do
          div(id: "task", class: focus_task_classes(@task)) do
            table { tbody { tr { cells } } }
          end
        end
      end

      private

      def cells
        timeframe_cell
        title_cell
        td(class: "col-xs-1") { task_link_to(edit_icon, @task) }
      end

      def timeframe_cell
        td(class: "col-xs-1") do
          timeframe_label_div
          focus_delete_button(@task)
        end
      end

      def timeframe_label_div
        return unless @task.timeframe

        div(class: "timeframe") { timeframe_label(@task.timeframe) }
      end

      def title_cell
        td(class: "col-xs-10 title") do
          div(class: "col-xs-10 col-xs-offset-1") do
            render(TitleForm.new(task: @task))
          end
          div(class: "col-xs-1") do
            span(class: "emblems") { task_repeat_emblem(@task) }
          end
        end
      end
    end
  end
end
