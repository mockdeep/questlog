class Task < ApplicationRecord

  class Update

    include JunkDrawer::Callable

    def call(task, task_params)
      task_params[:timeframe] = nil if task_params[:timeframe] == 'inbox'
      task.attributes = task_params
      task.save!
      record_completed_stat(task) if task_params[:done]
    end

  private

    def record_completed_stat(task)
      Stat::Create.(
        user: task.user,
        value: task.estimate_seconds,
        name: 'seconds-completed',
      )
    end

  end

end
