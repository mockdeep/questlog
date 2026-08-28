# frozen_string_literal: true

class TagList
  def self.for(user:)
    new(user).()
  end

  def initialize(user)
    @user = user
  end

  def call
    [all_tag, untagged_tag, estimate_tag, *user.ordered_tags]
  end

  private

  attr_reader :user

  def all_tag
    Tag.new(id: 0, name: "All", rules: [{ check: "isActive" }], slug: "")
  end

  def untagged_tag
    Tag.new(
      id: -1,
      name: "Untagged",
      rules: [{ check: "isEmpty", field: "tagIds" }],
      slug: "untagged",
    )
  end

  def estimate_tag
    Tag.new(
      id: -2,
      name: "Needs Estimate",
      rules: [{ check: "isBlank", field: "estimateSeconds" }],
      slug: "needs-estimate",
    )
  end
end
