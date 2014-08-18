module TasksHelper

  def task_classes(task)
    classes = []
    classes << "priority-#{task.priority}" if task.priority?
    classes << 'over_skipped' if task.skip_count >= 15
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
      '2 days' => 2.days,
      '3 days' => 3.days,
    }
  end

end
