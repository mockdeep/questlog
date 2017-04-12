class TimeframeSerializer

  include Serializeable

  serialize(:name, :tasks)

  def tasks(timeframe)
    timeframe.tasks.map(&method(:serialize))
  end

private

  def serialize(object)
    serializer_for(object).(object, root: false) if object
  end

  def serializer_for(object)
    "#{object.class}Serializer".constantize.new
  end

end
