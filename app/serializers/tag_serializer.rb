class TagSerializer

  include Serializable

  serialize(:id, :name, :rules, :unfinished_tasks_count, :slug)

end
