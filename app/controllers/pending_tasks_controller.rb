class PendingTasksController < ApplicationController

  def index
    respond_to { |format| format.json { render json: pending_tasks } }
  end

private

  def pending_tasks
    current_user.tasks.pending.ordered
  end

end
