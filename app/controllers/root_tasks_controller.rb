# frozen_string_literal: true

class RootTasksController < ApplicationController
  def index
    render(Views::Tasks::Index.new(tasks: TaskList.root(user: current_user)))
  end
end
