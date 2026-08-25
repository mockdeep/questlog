# frozen_string_literal: true

# One bucket of the timeframes page. A nil minute_max means the timeframe holds
# as much as you like.
class Timeframe
  NAMES = [
    "today",
    "week",
    "month",
    "quarter",
    "year",
    "lustrum",
    "decade",
    "century",
  ].freeze

  # the timeframes the page lays out, inbox first. "century" is a valid
  # timeframe for a task but has never had a place on the page.
  DISPLAY_NAMES = ["inbox", *(NAMES - ["century"])].freeze

  attr_reader :current_tasks, :minute_max, :name, :pending_tasks

  def initialize(name:, current_tasks: [], pending_tasks: [], minute_max: nil)
    @name = name
    @current_tasks = current_tasks
    @pending_tasks = pending_tasks
    @minute_max = minute_max
  end

  def tasks
    current_tasks + pending_tasks
  end

  def minute_total
    tasks.sum(&:estimate_minutes)
  end
end
