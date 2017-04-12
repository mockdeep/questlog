class TagSerializer

  include Serializeable

  serialize(:id, :name, :unfinished_tasks_count, :slug, :priority)

end
