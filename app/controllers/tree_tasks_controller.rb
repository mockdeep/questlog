# frozen_string_literal: true

class TreeTasksController < ApplicationController
  def index
    render(locals: { nodes: TaskTree.for(user: current_user) })
  end
end
