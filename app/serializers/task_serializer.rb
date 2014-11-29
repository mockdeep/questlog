class TaskSerializer < ActiveModel::Serializer

  attributes :id, :priority, :title, :repeat_seconds, :skip_count, :tag_names

end
