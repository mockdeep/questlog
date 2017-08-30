class Stat < ApplicationRecord

  belongs_to :user

  NAMES = %w[seconds-completed].freeze

  validates :user_id, presence: true
  validates :timestamp, uniqueness: { scope: :user_id }
  validates :name, presence: true, inclusion: { in: NAMES }

  def self.median_productivity
    beginning = 2.weeks.ago.beginning_of_day
    ending = Time.zone.now.beginning_of_day
    query = where('timestamp > ? AND timestamp < ?', beginning, ending)
    values = query.pluck(:value)
    Median.new(values, default: 1.hour)
  end

end
