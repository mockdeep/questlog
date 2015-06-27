class TaskSerializer < ActiveModel::Serializer

  attributes(
    :estimate_seconds,
    :id,
    :pending,
    :priority,
    :repeat_seconds,
    :release_at,
    :skip_count,
    :tag_names,
    :title,
    :timeframe,
  )

  def pending
    object.release_at.present?
  end

end
