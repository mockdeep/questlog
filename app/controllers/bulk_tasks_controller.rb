class BulkTasksController < ApplicationController

  def create
    BulkTask.create(bulk_task_params)
    redirect_to(tasks_path)
  end

private

  def bulk_task_params
    params.require(:bulk_task).permit(:titles).merge(user: current_user)
  end

end
