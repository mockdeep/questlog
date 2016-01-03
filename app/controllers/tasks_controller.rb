class TasksController < ApplicationController

  def index
    respond_to do |format|
      format.json { render json: current_user.undone_and_pending_tasks }
    end
  end

  def show
    task = current_user.next_task(params[:slug])
    respond_to do |format|
      format.json { render json: task }
    end
  end

  def create
    persist_current_user

    task = current_user.tasks.create!(task_params)
    flash[:success] = 'Task added'
    respond_to do |format|
      format.json { render json: task, status: :created }
    end
  end

  def update
    task = current_user.tasks.find(params[:id])
    TaskUpdate.(task, task_params.symbolize_keys)
    flash[:success] = task_update_message
    respond_to do |format|
      format.json { render json: task, status: :ok }
    end
  end

  def destroy
    task = current_user.tasks.find_by_id(params[:id])
    task.destroy if task
    flash[:success] = 'Task deleted'
    respond_to do |format|
      format.json { render json: {}, status: :ok }
      format.html { redirect_to :back }
    end
  end

private

  def task_params
    params.require(:task).permit(*permitted_params).merge(parsed_title)
  end

  def permitted_params
    [:done, :postpone, :title, :priority, :timeframe]
  end

  def parsed_title
    TitleParser.(params[:task][:title])
  end

  def task_update_message
    if task_params[:done]
      'Task marked done'
    elsif task_params[:postpone]
      'Task postponed'
    else
      'Task updated'
    end
  end

end
