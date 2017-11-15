class TaskSerializer

  include Serializable

  serialize(
    :estimate_seconds,
    :id,
    :pending,
    :position,
    :priority,
    :repeat_seconds,
    :release_at,
    :skip_count,
    :sub_tasks,
    :tag_names,
    :tag_ids,
    :title,
    :timeframe,
  )

  def pending(task)
    task.release_at.present?
  end

end
