# frozen_string_literal: true

class PagesController < ApplicationController
  def index
    render(Views::Tasks::Focus.new(board: TagBoard.for(user: current_user)))
  end

  def what
    render(Views::Pages::What.new)
  end

  def privacy
    render(Views::Pages::Privacy.new)
  end
end
