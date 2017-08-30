class BulkTasksController < ApplicationController

  def create
    Task::BulkCreate.(create_params.symbolize_keys)
    respond_to do |format|
      format.json { render json: {}, status: :ok }
    end
  end

  def update
    Task::BulkUpdate.(update_params.symbolize_keys)
    respond_to do |format|
      format.html { redirect_to(tasks_path) }
      format.json { render json: {}, status: :ok }
    end
  end

private

  def create_params
    params.require(:bulk_task).permit(:titles).to_h.merge(user: current_user)
  end

  def update_params
    params.require(:bulk_task)
      .permit(positions: [])
      .to_h
      .merge(user: current_user)
  end

end
