class TimeframeSerializer

  include Serializeable

  serialize(:name, :tasks)

  def tasks(timeframe)
    timeframe.tasks.map { |task| serialize(task) }
  end

end
