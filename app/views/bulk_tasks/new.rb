# frozen_string_literal: true

module Views
  module BulkTasks
    class New < Views::Base
      def view_template
        form_with(**form_options) do |form|
          row { form.text_area(:titles, **text_area_options) }
          row { form.submit("Add Tasks", class: "btn btn-success btn-block") }
        end
      end

      private

      def form_options
        { scope: :bulk_task, url: bulk_task_path, method: :post }
      end

      def text_area_options
        { class: "task-input", rows: 15, required: true }
      end

      def row(&)
        div(class: "row") { div(class: "col-md-offset-3 col-md-6", &) }
      end
    end
  end
end
