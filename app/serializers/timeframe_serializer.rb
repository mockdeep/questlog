class TimeframeSerializer

  include Serializeable

  serialize(:name, :tasks)

end
