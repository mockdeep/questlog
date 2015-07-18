class StatCreate

  def initialize(stat_value_class: StatValue)
    @stat_value_class = stat_value_class
  end

  def call(value:, user:, name:)
    find_params = { name: name, user: user, timestamp: today }
    stat = Stat.find_or_initialize_by(find_params)
    stat.value ||= 0
    stat.value += @stat_value_class.new(value: value, user: user)
    stat.save!
  end

private

  def today
    Time.zone.now.beginning_of_day
  end

end
