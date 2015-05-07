class TaskUpdate

  def initialize(task, stat_class: Stat)
    @task = task
    @stat_class = stat_class
  end

  def call(task_params)
    @task.attributes = task_params
    @task.save!
  end

end
