class BulkTasksController < ApplicationController

  def create
    BulkTask.create(create_params)
    redirect_to(tasks_path)
  end

  def update
    BulkTask.update(update_params.symbolize_keys)
    respond_to do |format|
      format.html { redirect_to(tasks_path) }
      format.json { render json: {}, status: :ok }
    end
  end

private

  def create_params
    params.require(:bulk_task).permit(:titles).merge(user: current_user)
  end

  def update_params
    params.require(:bulk_task).permit(positions: []).merge(user: current_user)
  end

end
