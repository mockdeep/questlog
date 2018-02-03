class TaskSerializer

  include Serializable

  serialize(
    :done_at,
    :estimate_seconds,
    :id,
    :parent_task_id,
    :pending,
    :position,
    :priority,
    :release_at,
    :repeat_seconds,
    :skip_count,
    :status,
    :tag_ids,
    :tag_names,
    :timeframe,
    :title,
    :updated_at,
  )

  def pending(task)
    task.release_at.present?
  end

end
