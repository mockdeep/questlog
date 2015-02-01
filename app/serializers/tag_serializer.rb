class TagSerializer < ActiveModel::Serializer

  attributes :id, :name, :unfinished_tasks_count, :slug, :priority

end
