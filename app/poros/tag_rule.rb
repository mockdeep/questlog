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
end
