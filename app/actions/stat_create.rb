class StatCreate

  def initialize(stat_class: Stat)
    @stat_class = stat_class
  end

  def call(timestamp:, **args)
    @stat_class.create!(args.merge(timestamp: timestamp.to_date))
  end

end
