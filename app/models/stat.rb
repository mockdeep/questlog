class Stat < ActiveRecord::Base

  belongs_to :user

  validates :user_id, presence: true
  validates :timestamp, uniqueness: { scope: :user_id }

  def self.median_productivity(median_class: Median)
    beginning = 2.weeks.ago.beginning_of_day
    ending = Time.zone.now.beginning_of_day
    query = where('timestamp > ? AND timestamp < ?', beginning, ending)
    values = query.pluck(:value)
    median_class.new(values, default: 1.hour)
  end

end
