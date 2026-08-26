# frozen_string_literal: true

class LeafTasksController < ApplicationController
  def index
    render(locals: { tasks: TaskList.leaf(user: current_user) })
  end
end
