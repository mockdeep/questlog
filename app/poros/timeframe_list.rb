# frozen_string_literal: true

# Lays the user's unfinished tasks out across the timeframes page. A pending
# task shows up in the first timeframe that ends after it is released, rather
# than in the timeframe it was filed under.
class TimeframeList
  def self.for(user:, median_productivity:)
    new(user, median_productivity).()
  end

  def initialize(user, median_productivity)
    @user = user
    @median_productivity = median_productivity
  end

  def call
    Timeframe::DISPLAY_NAMES.map { |name| timeframe_for(name) }
  end

  private

  attr_reader :user, :median_productivity

  def timeframe_for(name)
    current, pending = partition(grouped_tasks[name] || [])

    Timeframe.new(
      name:,
      current_tasks: current,
      pending_tasks: pending,
      minute_max: minute_max(name),
    )
  end

  def partition(tasks)
    tasks.partition { |task| task.release_at.nil? }
  end

  def grouped_tasks
    @grouped_tasks ||= displayed_tasks.group_by { |task| timeframe_name(task) }
  end

  def displayed_tasks
    user.undone_and_pending_tasks.select do |task|
      task.timeframe.nil? || Timeframe::DISPLAY_NAMES.include?(task.timeframe)
    end
  end

  def timeframe_name(task)
    return "inbox" if task.timeframe.nil?
    return task.timeframe if task.release_at.nil?

    release_timeframe_name(task)
  end

  def release_timeframe_name(task)
    index = Timeframe::DISPLAY_NAMES.index(task.timeframe)

    loop do
      name = Timeframe::DISPLAY_NAMES[index]
      ending = timeframe_ends[name.to_sym]
      return name if ending.nil? || task.release_at <= ending

      index += 1
    end
  end

  # the timeframes missing here run on for as long as you like
  def timeframe_ends
    @timeframe_ends ||= {
      today: now.end_of_day,
      week: now.end_of_week(:sunday),
      month: now.end_of_month,
      quarter: now.end_of_quarter,
      year: now.end_of_year,
    }
  end

  def minute_max(name)
    base = base_balances[name.to_sym]
    return if base.nil?

    minutes = (base * median_productivity / 60.0).floor

    name == "today" ? minutes : (minutes / 2.0).floor
  end

  def base_balances
    @base_balances ||= TimeBalancer.base_balances(now)
  end

  def now
    @now ||= Time.zone.now
  end
end
