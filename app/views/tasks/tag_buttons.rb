# frozen_string_literal: true

module Views
  module Tasks
    class TagButtons < Views::Base
      register_output_helper :tag_button

      def initialize(tags:, task:, slug:)
        @tags = tags
        @task = task
        @slug = slug
        super()
      end

      def view_template
        div(class: "row") do
          div(class: "col-md-12 tag-buttons") do
            @tags.each { |tag| tag_button_div(tag) }
          end
        end
      end

      private

      def tag_button_div(tag)
        div { tag_button(tag, task: @task, slug: @slug) }
      end
    end
  end
end
