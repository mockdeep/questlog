class TaskDestroy

  include Callable

  def call(task)
    task.destroy
  end

end
