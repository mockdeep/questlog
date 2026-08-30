# frozen_string_literal: true

module Views
  module Tags
    class Index < Views::Base
      def initialize(tags:)
        @tags = tags
        super()
      end

      def view_template
        @tags.each { |tag| tag_row(tag) }
      end

      private

      def tag_row(tag)
        div(class: "tag-row") do
          plain(tag.name)
          whitespace
          link_to("Edit", edit_tag_path(tag), class: "edit-button")
        end
      end
    end
  end
end
