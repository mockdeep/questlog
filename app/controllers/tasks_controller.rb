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

    @new_task = current_user.tasks.new(task_params)
    if @new_task.save
      redirect_to :back
    else
      @contexts = current_user.ordered_contexts.active
      @task = current_user.tasks.undone.first
      render 'show'
    end
  end

  def update
    task = current_user.tasks.find(params[:id])
    task.update_attributes!(task_params)
    redirect_to :back
  end

  def destroy
    task = current_user.tasks.find_by_id(params[:id])
    task.destroy if task
    redirect_to :back
  end

private

  def load_task
    if params[:slug] && current_user.account.guest?
      context = current_user.contexts.friendly.find_by_id(params[:slug])
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

end
