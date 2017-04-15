class ArraySerializer

  include Serializeable

private

  def serialize_object(array)
    array.map { |task| serialize(task) }
  end

end
