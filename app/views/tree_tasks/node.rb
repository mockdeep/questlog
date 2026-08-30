# frozen_string_literal: true

module Views
  module TreeTasks
    class Node < Views::Base
      DISPLAY = "task-item__checkbox-display"

      register_value_helper :complete_task_form_options
      register_value_helper :task_title_class

      def initialize(node:)
        @node = node
        super()
      end

      def view_template
        li(class: "task-item") do
          div(class: "task-item__checkbox") { checkbox }
          span(class: task_title_class(task)) { task.title }
          render(Tree.new(nodes: @node.children)) if children?
        end
      end

      private

      def task
        @node.task
      end

      def children?
        @node.children.any?
      end

      def checkbox_id
        "complete-task-#{task.id}"
      end

      def checkbox
        return disabled_checkbox if children?

        form_with(**complete_task_form_options(task)) do
          checkbox_input
          label(for: checkbox_id, class: [DISPLAY, "#{DISPLAY}--enabled"])
        end
      end

      def checkbox_input
        check_box_tag(
          "task[done]",
          "true",
          false,
          id: checkbox_id,
          class: "task-item__checkbox-actual",
        )
      end

      def disabled_checkbox
        input(
          type: "checkbox",
          id: checkbox_id,
          disabled: true,
          class: "task-item__checkbox-actual",
        )
        label(for: checkbox_id, class: DISPLAY)
      end
    end
  end
end
