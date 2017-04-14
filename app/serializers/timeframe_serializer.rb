class TimeframeSerializer

  include Serializeable

  serialize(:name, :tasks)

  def tasks(timeframe)
    timeframe.tasks.map { |task| serialize(task, root: false) }
  end

end
