# frozen_string_literal: true

class RootTasksController < ApplicationController
  def index
    render(locals: { tasks: TaskList.root(user: current_user) })
  end
end
