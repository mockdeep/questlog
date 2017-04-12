class TaskSerializer

  include Serializeable

  serialize(
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

  def pending(task)
    task.release_at.present?
  end

end
