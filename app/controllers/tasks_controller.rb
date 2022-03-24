class TasksController < ApplicationController
  def index
    respond_to do |format|
      format.json do
        render json: serialize(current_user.undone_and_pending_tasks)
      end
      format.html
    end
  end

  def create
    persist_current_user

    Task::Create.(**task_params, user: current_user)

    flash[:success] = 'Task added'
    redirect_back(fallback_location: root_path)
  end

  def show
    task = current_user.next_task(params[:slug])
    respond_to do |format|
      format.json { render json: serialize(task) }
      format.html do
        render(locals: { task: current_user.tasks.find(params[:id]) })
      end
    end
  end

  def update
    task = current_user.tasks.find(params[:id])
    Task::Update.(task, task_params)
    respond_to do |format|
      format.json { render json: serialize(task), status: :ok }
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
    [:done, :parent_task_id, :postpone, :title, :priority, :timeframe]
  end

  def parsed_title
    TitleParser.(params[:task][:title])
  end
end
