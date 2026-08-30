# frozen_string_literal: true

class BulkTasksController < ApplicationController
  def new
    render(Views::BulkTasks::New.new)
  end

  def create
    Task::BulkCreate.(**create_params.symbolize_keys)
    respond_to do |format|
      format.html { redirect_to "/tasks" }
    end
  end

  private

  def create_params
    params.expect(bulk_task: [:titles]).to_h.merge(user: current_user)
  end
end
