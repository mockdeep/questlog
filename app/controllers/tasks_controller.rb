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
    @task_form = TaskForm.new(current_user)
    # title= depends on user being assigned first. This should be fixed.
    if @task_form.submit(task_params)
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
    params[:task].permit(
      :done,
      :skip,
      :title,
      :context_ids,
      :priority,
      :repeat_string,
      :time_estimate,
    )
  end

end
