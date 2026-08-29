# frozen_string_literal: true

module Views
  module Tasks
    class BreadCrumbs < Views::Base
      register_output_helper :task_link_to

      def initialize(task:)
        @task = task
        super()
      end

      def view_template
        @task.parent_tasks.each do |parent_task|
          plain(" > ")
          task_link_to(parent_task.title, parent_task)
        end
      end
    end
  end
end
