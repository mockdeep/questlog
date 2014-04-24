module TasksHelper

  def task_classes(task)
    classes = []
    classes << "priority#{task.priority}" if task.priority?
    classes << 'over_skipped' if task.over_skipped?
    classes.join(' ')
  end

end
