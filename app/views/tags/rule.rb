# frozen_string_literal: true

module Views
  module Tags
    class Rule < Views::Base
      def initialize(rule:)
        @rule = rule
        super()
      end

      def view_template
        li(data: { controller: "tag-rule", tag_rules_target: "rule" }) do
          field_select
          TagRule::FIELDS.each do |field|
            whitespace
            check_select(field)
          end
          whitespace
          remove_icon
        end
      end

      private

      def field_select
        select(name: "tag[rules][][field]", data: field_data) do
          TagRule::FIELDS.each { |field| field_option(field) }
        end
      end

      def field_data
        { tag_rule_target: "field", action: "change->tag-rule#fieldChanged" }
      end

      def field_option(field)
        option(value: field[:name], selected: field == selected_field) do
          field[:label]
        end
      end

      def check_select(field)
        select(**check_options(field)) do
          field[:checks].each { |check| check_option(check) }
        end
      end

      def check_options(field)
        inactive = field != selected_field

        {
          name: "tag[rules][][check]",
          disabled: inactive,
          hidden: inactive,
          data: { tag_rule_target: "check", check_field: field[:name] },
        }
      end

      def check_option(check)
        option(value: check[:name], selected: check[:name] == @rule[:check]) do
          check[:label]
        end
      end

      def remove_icon
        i(class: "fas fa-times", data: { action: "click->tag-rule#remove" })
      end

      def selected_field
        @selected_field ||= TagRule.field_for(@rule)
      end
    end
  end
end
