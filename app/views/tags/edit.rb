# frozen_string_literal: true

module Views
  module Tags
    class Edit < Views::Base
      INTRO = "Tag will include all tasks that match one or more of the " \
              "following rules:"

      def initialize(tag:, rules:)
        @tag = tag
        @rules = rules
        super()
      end

      def view_template
        heading
        form_with(**form_options) do |form|
          rules_list
          rules_template
          add_button
          whitespace
          form.submit("Save Tag", class: "btn btn-success btn-block")
        end
      end

      private

      def heading
        plain("Editing tag #{@tag.name}")
        br
        link_to("Back to tags list", tags_path)
        h2 { "Rules" }
        plain(INTRO)
      end

      def form_options
        { url: tag_path(@tag.id), method: :patch, data: form_data }
      end

      def form_data
        {
          controller: "tag-rules",
          action: "submit->tag-rules#validateAndSave",
        }
      end

      def rules_list
        ol(data: { tag_rules_target: "list" }) do
          @rules.each { |rule| render(Rule.new(rule:)) }
        end
      end

      def rules_template
        template(data: { tag_rules_target: "template" }) do
          render(Rule.new(rule: {}))
        end
      end

      def add_button
        input(
          class: "btn btn-primary btn-small",
          type: "button",
          value: "Add Rule",
          data: { action: "click->tag-rules#add" },
        )
      end
    end
  end
end
