# frozen_string_literal: true

module Views
  module Tasks
    class New < Views::Base
      PLACEHOLDER = "e.g: new do laundry #home @10am ~1h"

      def initialize(parent_task: nil)
        @parent_task = parent_task
        super()
      end

      def view_template
        form_with(model: Task.new, id: "new-form") do |form|
          div(class: "row") do
            parent_task_field(form)
            title_field(form)
          end
          div(class: "row") do
            form.submit("Add Task", class: "btn btn-success btn-block")
          end
        end
      end

      private

      def parent_task_field(form)
        return unless @parent_task

        form.hidden_field(:parent_task_id, value: @parent_task.id)
      end

      def title_field(form)
        form.text_field(
          :title,
          id: "new-title",
          class: "task-input",
          placeholder: PLACEHOLDER,
          required: true,
        )
      end
    end
  end
end
