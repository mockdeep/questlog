class TaskDestroy

  include JunkDrawer::Callable

  def call(task)
    task.destroy
  end

end
