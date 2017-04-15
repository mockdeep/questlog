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

  def serialize_object(array)
    array.map { |task| serialize(task) }
  end

end
