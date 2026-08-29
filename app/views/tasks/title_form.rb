# frozen_string_literal: true

module Views
  module Tasks
    class TitleForm < Views::Base
      include Phlex::Rails::Helpers::FormWith
      include Phlex::Rails::Helpers::TextAreaTag

      register_value_helper :task_title_field_options

      def initialize(task:)
        @task = task
        super()
      end

      def view_template
        form_with(**form_options) do
          text_area_tag("task[title]", @task.title, task_title_field_options)
        end
      end

      private

      def form_options
        { url: task_path(@task), method: :patch, data: { turbo: true } }
      end
    end
  end
end
