class TagSerializer

  include Serializable

  serialize(:id, :name, :unfinished_tasks_count, :slug, :priority)

end
