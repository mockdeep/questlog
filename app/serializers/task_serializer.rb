class TaskSerializer

  include Serializable

  serialize(
    :estimate_seconds,
    :id,
    :parent_task_id,
    :pending,
    :position,
    :priority,
    :repeat_seconds,
    :release_at,
    :skip_count,
    :tag_names,
    :tag_ids,
    :title,
    :timeframe,
  )

  def pending(task)
    task.release_at.present?
  end

end
