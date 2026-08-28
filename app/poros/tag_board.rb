# frozen_string_literal: true

# The tag buttons above the focus view, and the one task that view shows.
#
# A tag claims a task when the task carries that tag, or when one of the tag's
# smart rules matches it. Only tasks the user could pick up right now count, so
# a tag no task claims is left off the board entirely.
class TagBoard
  Entry = Data.define(:id, :name, :slug, :priority, :tasks)
  Result = Data.define(:slug, :tags, :task)

  def self.for(user:, slug: "")
    new(user, slug).()
  end

  def initialize(user, slug)
    @user = user
    @slug = slug.to_s
  end

  def call
    Result.new(slug:, tags: claimed_tags, task: selected_tag&.tasks&.first)
  end

  private

  attr_reader :user, :slug

  def claimed_tags
    entries.reject { |entry| entry.tasks.empty? }
  end

  def selected_tag
    entries.detect { |entry| entry.slug == slug }
  end

  def entries
    @entries ||= TagList.for(user:).map { |tag| entry_for(tag) }.sort_by(&:name)
  end

  def entry_for(tag)
    tasks = candidate_tasks.select { |task| claimed_by?(task, tag) }

    Entry.new(
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      priority: tasks.filter_map(&:priority).min,
      tasks:,
    )
  end

  def candidate_tasks
    @candidate_tasks ||= TaskList.leaf(user:).current
  end

  def claimed_by?(task, tag)
    return true if task.tag_ids.include?(tag.id)

    tag.rules.any? { |rule| matches?(task, rule.symbolize_keys) }
  end

  def matches?(task, rule)
    case rule[:check]
    when "isActive" then true
    when "isBlank" then field_of(task, rule).nil?
    when "isEmpty" then field_of(task, rule).empty?
    else raise(ArgumentError, "unknown tag rule check: #{rule[:check]}")
    end
  end

  # The client wrote rule fields in its own casing, and they are stored that
  # way, so a task cannot simply be asked for one by name.
  def field_of(task, rule)
    case rule[:field]
    when "estimateSeconds" then task.estimate_seconds
    when "tagIds" then task.tag_ids
    else raise(ArgumentError, "unknown tag rule field: #{rule[:field]}")
    end
  end
end
