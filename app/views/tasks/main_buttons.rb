# frozen_string_literal: true

module Views
  module Tasks
    class MainButtons < Views::Base
      register_value_helper :postpone_form_options
      register_value_helper :postpone_options

      def initialize(task:)
        @task = task
        super()
      end

      def view_template
        div(class: "row main-button", id: "buttons") do
          div(class: "col-md-6") { done_button }
          div(class: "col-md-6") { postpone_form }
        end
      end

      private

      def done_button
        button_to("Done! Give me another!", task_path(@task), **done_options)
      end

      def done_options
        {
          method: :patch,
          params: { task: { done: true } },
          class: "btn btn-primary btn-lg btn-block",
          form: { class: "contents-form", data: { turbo: true } },
        }
      end

      def postpone_form
        form_with(**postpone_form_options(@task)) do
          label { "Postpone for:" }
          select_tag("task[postpone]", postpone_options, id: nil)
        end
      end
    end
  end
end
