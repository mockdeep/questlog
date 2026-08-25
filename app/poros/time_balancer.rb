# frozen_string_literal: true

# How many days' worth of productivity each timeframe is allowed to hold. Every
# timeframe starts where the previous one ended, and none of them may end before
# the end of this week.
class TimeBalancer
  def self.base_balances(time = Time.zone.now)
    new(time).()
  end

  def initialize(time)
    @time = time
  end

  def call
    {
      today: 1,
      week: days_between(time, end_of_week),
      month: days_between(end_of_week, end_of_month),
      quarter: days_between(end_of_month, end_of_quarter),
      year: days_between(end_of_quarter, end_of_year),
    }
  end

  private

  attr_reader :time

  def end_of_week
    @end_of_week ||= time.end_of_week(:sunday)
  end

  def end_of_month
    [time.end_of_month, end_of_week].max
  end

  def end_of_quarter
    [time.end_of_quarter, end_of_week].max
  end

  def end_of_year
    [time.end_of_year, end_of_week].max
  end

  def days_between(start_time, end_time)
    ((end_time - start_time) / 1.day).truncate
  end
end
