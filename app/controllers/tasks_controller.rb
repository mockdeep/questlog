class TasksController < ApplicationController

  def index
    @tasks = current_user.tasks.undone
    @pending_tasks = current_user.tasks.pending
  end

  def show
    @task_form = TaskForm.new(current_user)
    @task = current_user.next_task(params[:slug])
    @contexts = current_user.ordered_contexts.active
  end

  def create
    persist_current_user

    @task_form = current_user.tasks.new(task_params)
    if @task_form.save
      redirect_to :back
    else
      @contexts = current_user.ordered_contexts
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
    current_user.tasks.find(params[:id]).destroy
    redirect_to :back
  end

private

  def task_params
    params[:task].permit(:done, :postpone, :title).merge(parsed_title)
  end

  def parsed_title
    TitleParser.new.parse_title(params[:task][:title])
  end

end
