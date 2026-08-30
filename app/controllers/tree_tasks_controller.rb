# frozen_string_literal: true

class TreeTasksController < ApplicationController
  def index
    render(Views::TreeTasks::Index.new(nodes: TaskTree.for(user: current_user)))
  end
end
