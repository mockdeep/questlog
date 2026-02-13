class BulkTasksController < ApplicationController
  def new; end

  def create
    Task::BulkCreate.(**create_params.symbolize_keys)
    respond_to do |format|
      format.html { redirect_to "/tasks" }
    end
  end

  def update
    Task::BulkUpdate.(**update_params.symbolize_keys)
    respond_to do |format|
      format.html { redirect_to(tasks_path) }
      format.json { render json: {}, status: :ok }
    end
  end

  private

  def create_params
    params.expect(bulk_task: [:titles]).to_h.merge(user: current_user)
  end

  def update_params
    params.expect(bulk_task: [{ positions: [] }]).to_h.merge(user: current_user)
  end
end
