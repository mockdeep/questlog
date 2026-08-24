# frozen_string_literal: true

module TagRule
  FIELDS = [
    {
      name: "estimateSeconds",
      label: "Estimate Seconds",
      checks: [{ name: "isBlank", label: "is blank" }],
    },
    {
      name: "tagIds",
      label: "Tags",
      checks: [{ name: "isEmpty", label: "is empty" }],
    },
  ].freeze

  def self.field_for(rule)
    name = rule[:field]

    return FIELDS.first if name.blank?

    field = FIELDS.detect { |candidate| candidate[:name] == name }

    raise(ArgumentError, "unknown rule field: #{name}") if field.nil?

    field
  end
end
