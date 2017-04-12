class ArraySerializer

  include Serializeable

  def self.root_name
    caller
      .grep(/_controller/)
      .grep_v(/application_controller/)
      .first
      .match(/\/(\w+)_controller/)
      .captures
      .first
  end

private

  def serialize(object)
    serializer_for(object).(object, root: false) if object
  end

  def serializer_for(object)
    "#{object.class}Serializer".constantize.new
  end

  def serialize_object(array)
    array.map { |task| serialize(task) }
  end

end
