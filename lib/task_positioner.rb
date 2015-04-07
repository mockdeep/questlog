class TaskPositioner

  def position_tasks!
    User.find_each { |user| Task.reposition(ordered_task_ids(user)) }
    Task.done.where(position: nil).update_all(position: 0)
  end

  def ordered_task_ids(user)
    user.tasks.undone.order(:priority, :updated_at).pluck(:id)
  end

end
