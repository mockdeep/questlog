class TaskUpdate

  def initialize(task)
    @task = task
  end

  def call(stat_create: StatCreate.new, **task_params)
    task_params[:timeframe] = nil if task_params[:timeframe] == 'inbox'
    @task.attributes = task_params
    if @task.changed_to_done? && !@task.release_at
      stat_create.(user: @task.user, value: @task.estimate_seconds)
    end
    @task.save!
  end

end
