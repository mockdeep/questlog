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
    Tag.new(
      id: 0,
      name: "All",
      rules: [{ check: "isActive" }],
      unfinished_tasks_count: user.unfinished_tasks_count,
      slug: "",
      tasks: user.unfinished_tasks,
    )
  end

  def untagged_tag
    Tag.new(
      id: -1,
      name: "Untagged",
      rules: [{ check: "isEmpty", field: "tagIds" }],
      unfinished_tasks_count: user.untagged_tasks.count,
      slug: "untagged",
      tasks: user.untagged_tasks,
    )
  end

  def estimate_tag
    Tag.new(
      id: -2,
      name: "Needs Estimate",
      rules: [{ check: "isBlank", field: "estimateSeconds" }],
      unfinished_tasks_count: user.tasks.without_estimate.count,
      slug: "needs-estimate",
      tasks: user.tasks.without_estimate,
    )
  end
end
