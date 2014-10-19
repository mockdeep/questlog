class TasksController < ApplicationController

  before_action :load_task, only: :show

  def index
    @tasks = current_user.tasks.undone
    @pending_tasks = current_user.tasks.pending
  end

  def show
    @new_task = current_user.tasks.new
    @contexts = current_user.ordered_contexts.active
  end

  def create
    persist_current_user

    current_user.tasks.create!(task_params)
    flash[:success] = 'Task added'
    respond_to { |format| format.json { render json: '', status: :created } }
  end

  def update
    task = current_user.tasks.find(params[:id])
    task.update_attributes!(task_params)
    flash[:success] = task_update_message
    respond_to do |format|
      format.json { render json: '', status: :ok }
      format.html { redirect_to :back }
    end
  end

  def destroy
    task = current_user.tasks.find_by_id(params[:id])
    task.destroy if task
    flash[:success] = 'Task deleted'
    respond_to do |format|
      format.json { render json: '', status: :ok }
      format.html { redirect_to :back }
    end
  end

private

  def load_task
    if params[:slug] && current_user.account.guest?
      context = current_user.contexts.find_by_slug(params[:slug])
      if context
        @task = context.next_task
      else
        login_first
      end
    elsif params[:slug]
      @task = current_user.contexts.friendly.find(params[:slug]).next_task
    else
      @task = current_user.next_task(params[:slug])
    end
  end

  def task_params
    params.require(:task).permit(:done, :postpone, :title).merge(parsed_title)
  end

  def parsed_title
    TitleParser.new.parse(params[:task][:title])
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
