module TasksHelper

  def task_classes(task)
    classes = []
    classes << "priority-#{task.priority}" if task.priority?
    classes << 'over_skipped' if task.skip_count >= 15
    classes.join(' ')
  end

end
