# frozen_string_literal: true

class PagesController < ApplicationController
  def index
    render(Views::Tasks::Focus.new(board: TagBoard.for(user: current_user)))
  end

  def what; end
end
