# frozen_string_literal: true

module Views
  module Tasks
    class Show < Views::Base
      def initialize(task:, details:, sub_tasks:)
        @task = task
        @details = details
        @sub_tasks = sub_tasks
        super()
      end

      def view_template
        turbo_frame_tag("task-details") { section { task_details } }
        render(New.new(parent_task: @task))
      end

      private

      def task_details
        render(BreadCrumbs.new(task: @task))
        h2 { render(TitleForm.new(task: @task)) }
        @details.each { |detail| div { detail } }
        render(Table.new(**sub_task_options))
      end

      def sub_task_options
        {
          tasks: @sub_tasks,
          table_id: "sub-tasks",
          heading: "Sub-tasks",
          status: nil,
          draggable: false,
        }
      end
    end
  end
end
