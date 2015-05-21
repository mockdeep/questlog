class TaskSerializer < ActiveModel::Serializer

  attributes(
    :estimate_seconds,
    :id,
    :pending,
    :priority,
    :repeat_seconds,
    :skip_count,
    :tag_names,
    :title,
  )

  def pending
    object.release_at.present?
  end

end
