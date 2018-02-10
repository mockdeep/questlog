class Stat < ApplicationRecord

  belongs_to :user

  NAMES = %w[seconds-completed].freeze

  validates :user_id, presence: true
  validates :timestamp, uniqueness: { scope: :user_id }
  validates :name, presence: true, inclusion: { in: NAMES }

  def self.median_productivity
    beginning = 2.weeks.ago.beginning_of_day
    ending = Time.zone.now.beginning_of_day
    scope = where('timestamp > ? AND timestamp < ?', beginning, ending)
    scope.median || 1.hour
  end

  def self.median
    Median.(pluck(:value))
  end

  def self.mean
    Mean.(pluck(:value))
  end

  def self.standard_deviation
    StandardDeviation.(pluck(:value))
  end

end
