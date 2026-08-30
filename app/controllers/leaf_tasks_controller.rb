# frozen_string_literal: true

class LeafTasksController < ApplicationController
  def index
    render(Views::Tasks::Index.new(tasks: TaskList.leaf(user: current_user)))
  end
end
