class TaskUpdate

  include Callable

  def call(task, task_params)
    task_params[:timeframe] = nil if task_params[:timeframe] == 'inbox'
    task.attributes = task_params
    if task_params[:done]
      StatCreate.(
        user: task.user,
        value: task.estimate_seconds,
        name: 'seconds-completed',
      )
    end
    task.save!
  end

end
