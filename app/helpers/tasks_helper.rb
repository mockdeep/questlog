module TasksHelper

  def task_classes(task)
    classes = []
    classes << "priority#{task.priority}" if task.priority?
    classes << 'over_skipped' if task.over_skipped?
    classes.join(' ')
  end

  def postpone_options
    {
      '5 minutes' => 5.minutes,
      '30 minutes' => 30.minutes,
      '1 hour' => 1.hour,
      '3 hours' => 3.hours,
      '6 hours' => 6.hours,
      '9 hours' => 9.hours,
      '12 hours' => 12.hours,
      '1 day' => 1.day,
    }
  end

end
