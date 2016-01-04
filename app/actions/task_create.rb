class TaskCreate

  include Callable

  def call(user:, **task_params)
    user.tasks.create!(task_params)
  end

end
