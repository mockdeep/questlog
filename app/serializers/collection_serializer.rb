class CollectionSerializer

  include Serializeable

private

  def serialize_object(collection)
    collection.map { |item| serialize(item) }
  end

end
