# frozen_string_literal: true

class PagesController < ApplicationController
  def index
    render(locals: { board: TagBoard.for(user: current_user) })
  end

  def what; end
end
