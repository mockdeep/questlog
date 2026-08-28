# frozen_string_literal: true

class TasksController < ApplicationController
  def index
    render(locals: { tasks: TaskList.all(user: current_user) })
  end

  def show
    render(locals: show_locals)
  end

  def create
    persist_current_user

    Task::Create.(**task_params, user: current_user)

    flash[:success] = t(".success")
    redirect_back(fallback_location: root_path)
  end

  def update
    task = current_user.tasks.find(params.expect(:id))
    Task::Update.(task, task_params)
    redirect_back(fallback_location: root_path)
  end

  def destroy
    task = current_user.tasks.find(params.expect(:id))
    Task::Destroy.(task)
    redirect_back(fallback_location: root_path)
  end

  private

  def show_locals
    task = current_user.tasks.find(params.expect(:id))

    {
      task:,
      details: TaskDetails.for(task),
      sub_tasks: task.sub_tasks.undone_and_pending.order(:id),
    }
  end

  def task_params
    params
      .expect(task: Array(permitted_params))
      .to_h
      .symbolize_keys
      .merge(parsed_title)
  end

  def permitted_params
    [
      :done,
      :parent_task_id,
      :position,
      :postpone,
      :priority,
      :timeframe,
      :title,
    ]
  end

  def parsed_title
    TitleParser.(params[:task][:title])
  end
end
