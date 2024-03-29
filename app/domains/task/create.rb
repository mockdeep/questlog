class Task < ApplicationRecord
  class Create
    include JunkDrawer::Callable

    def call(user:, **task_params)
      validate_parent_task(task_params, user:)

      user.tasks.create!(task_params)
    end

    private

    def validate_parent_task(task_params, user:)
      return if task_params[:parent_task_id].blank?

      user.tasks.find(task_params[:parent_task_id])
    end
  end
end
