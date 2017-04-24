class TasksController < ApplicationController

  def index
    respond_to do |format|
      format.json do
        render json: serialize(current_user.undone_and_pending_tasks)
      end
    end
  end

  def show
    task = current_user.next_task(params[:slug])
    respond_to do |format|
      format.json { render json: serialize(task) }
    end
  end

  def create
    persist_current_user

    task = Task::Create.(task_params.merge(user: current_user))
    respond_to do |format|
      format.json { render json: serialize(task), status: :created }
    end
  end

  def update
    task = current_user.tasks.find(params[:id])
    Task::Update.(task, task_params)
    respond_to do |format|
      format.json { render json: serialize(task), status: :ok }
    end
  end

  def destroy
    task = current_user.tasks.find(params[:id])
    Task::Destroy.(task)
    respond_to do |format|
      format.json { render json: {}, status: :ok }
    end
  end

private

  def task_params
    params.require(:task)
          .permit(*permitted_params)
          .to_h
          .symbolize_keys
          .merge(parsed_title)
  end

  def permitted_params
    %i[done postpone title priority timeframe]
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
