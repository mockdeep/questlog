# frozen_string_literal: true

class AlphaController < ApplicationController
  def index
    render(Views::Alpha::Index.new)
  end
end
