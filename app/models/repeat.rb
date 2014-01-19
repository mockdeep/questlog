class Repeat

  attr_reader :time_delta

  def initialize(repeat_string)
    @time_delta = self.class.repeat_maps.fetch(repeat_string)
  end

  def self.repeat_maps
    {
      'every hour' => 1.hour,
      'every 3 hours' => 3.hours,
      'every 6 hours' => 6.hours,
      'every day' => 1.day,
      'every 3 days' => 3.days,
      'every week' => 1.week,
      'every 2 weeks' => 2.weeks,
      'every month' => 1.month,
      'every 3 months' => 3.months,
      'every year' => 1.year,
    }
  end

end
